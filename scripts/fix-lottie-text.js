/**
 * Fix Lottie Logo: Inject "AIRIMPULS" text paths into the empty Layer 3.
 * Uses opentype.js to extract glyph outlines from Segoe UI fonts,
 * then converts SVG-style path commands into Lottie bezier shape data.
 */
const opentype = require("opentype.js");
const fs = require("fs");
const path = require("path");

// --- Config (matches the SVG <text> element) ---
const LOTTIE_PATH = path.join(__dirname, "../public/animations/airimpuls-logo.json");
const FONT_LIGHT = "C:\\Windows\\Fonts\\segoeuil.ttf";   // weight 300
const FONT_BOLD = "C:\\Windows\\Fonts\\segoeuib.ttf";    // weight 700 (closest to 900)
const FONT_SIZE = 160;
const TEXT_X = 480;
const TEXT_Y = 380;
const LETTER_SPACING = 3;
const FILL_COLOR = [0.314, 0.353, 0.361, 1]; // #505A5C

// --- SVG path command parser ---
function parseSvgPath(pathData) {
  const commands = [];
  const regex = /([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)/g;
  let match;
  while ((match = regex.exec(pathData)) !== null) {
    const cmd = match[1];
    const args = match[2].trim().split(/[\s,]+/).filter(Boolean).map(Number);
    commands.push({ cmd, args });
  }
  return commands;
}

// --- Convert SVG path to Lottie shape (vertices, in-tangents, out-tangents) ---
function svgPathToLottieShape(pathData) {
  const commands = parseSvgPath(pathData);
  const shapes = [];
  let currentPath = null;
  let cx = 0, cy = 0;

  function startPath() {
    currentPath = { v: [], i: [], o: [] };
  }

  function closePath() {
    if (currentPath && currentPath.v.length > 0) {
      shapes.push({ ...currentPath, c: true });
    }
    currentPath = null;
  }

  function addVertex(x, y, ix = 0, iy = 0, ox = 0, oy = 0) {
    currentPath.v.push([x, y]);
    currentPath.i.push([ix, iy]);
    currentPath.o.push([ox, oy]);
  }

  for (const { cmd, args } of commands) {
    switch (cmd) {
      case "M":
        if (currentPath && currentPath.v.length > 0) closePath();
        startPath();
        cx = args[0]; cy = args[1];
        addVertex(cx, cy);
        // Handle implicit lineTo after M
        for (let j = 2; j < args.length; j += 2) {
          const prevIdx = currentPath.v.length - 1;
          cx = args[j]; cy = args[j + 1];
          addVertex(cx, cy);
        }
        break;

      case "L":
        for (let j = 0; j < args.length; j += 2) {
          cx = args[j]; cy = args[j + 1];
          addVertex(cx, cy);
        }
        break;

      case "H":
        for (let j = 0; j < args.length; j++) {
          cx = args[j];
          addVertex(cx, cy);
        }
        break;

      case "V":
        for (let j = 0; j < args.length; j++) {
          cy = args[j];
          addVertex(cx, cy);
        }
        break;

      case "C":
        for (let j = 0; j < args.length; j += 6) {
          const cp1x = args[j], cp1y = args[j + 1];
          const cp2x = args[j + 2], cp2y = args[j + 3];
          const ex = args[j + 4], ey = args[j + 5];

          // Set out-tangent of previous vertex (relative to previous vertex)
          const prevIdx = currentPath.v.length - 1;
          const prevX = currentPath.v[prevIdx][0];
          const prevY = currentPath.v[prevIdx][1];
          currentPath.o[prevIdx] = [cp1x - prevX, cp1y - prevY];

          // Add new vertex with in-tangent (relative to vertex)
          addVertex(ex, ey, cp2x - ex, cp2y - ey, 0, 0);

          cx = ex; cy = ey;
        }
        break;

      case "Q":
        for (let j = 0; j < args.length; j += 4) {
          const qcpx = args[j], qcpy = args[j + 1];
          const ex = args[j + 2], ey = args[j + 3];

          // Convert quadratic to cubic approximation
          const prevIdx = currentPath.v.length - 1;
          const prevX = currentPath.v[prevIdx][0];
          const prevY = currentPath.v[prevIdx][1];

          const cp1x = prevX + (2 / 3) * (qcpx - prevX);
          const cp1y = prevY + (2 / 3) * (qcpy - prevY);
          const cp2x = ex + (2 / 3) * (qcpx - ex);
          const cp2y = ey + (2 / 3) * (qcpy - ey);

          currentPath.o[prevIdx] = [cp1x - prevX, cp1y - prevY];
          addVertex(ex, ey, cp2x - ex, cp2y - ey, 0, 0);

          cx = ex; cy = ey;
        }
        break;

      case "Z":
      case "z":
        closePath();
        break;
    }
  }

  if (currentPath && currentPath.v.length > 0) {
    closePath();
  }

  return shapes;
}

// --- Get text as SVG path from opentype ---
function getTextPath(fontPath, text, x, y, fontSize) {
  const font = opentype.loadSync(fontPath);
  const glyphPath = font.getPath(text, x, y, fontSize);
  return glyphPath.toSVG().match(/d="([^"]+)"/)?.[1] || "";
}

// --- Get text advance width ---
function getTextWidth(fontPath, text, fontSize) {
  const font = opentype.loadSync(fontPath);
  let width = 0;
  const glyphs = font.stringToGlyphs(text);
  for (const glyph of glyphs) {
    width += (glyph.advanceWidth / font.unitsPerEm) * fontSize;
  }
  width += (text.length - 1) * LETTER_SPACING;
  return width;
}

// --- Build Lottie shape group from SVG path contours ---
function buildLottieShapeGroup(name, contours, fillColor) {
  const shapeItems = [];

  for (let i = 0; i < contours.length; i++) {
    shapeItems.push({
      ty: "sh",
      nm: `Path ${i + 1}`,
      ks: {
        a: 0,
        k: {
          v: contours[i].v,
          i: contours[i].i,
          o: contours[i].o,
          c: contours[i].c,
        },
      },
    });
  }

  // Fill
  shapeItems.push({
    ty: "fl",
    nm: "Fill",
    c: { a: 0, k: fillColor },
    o: { a: 0, k: 100 },
    r: 1,
    bm: 0,
  });

  // Transform
  shapeItems.push({
    ty: "tr",
    p: { a: 0, k: [0, 0] },
    a: { a: 0, k: [0, 0] },
    s: { a: 0, k: [100, 100] },
    r: { a: 0, k: 0 },
    o: { a: 0, k: 100 },
  });

  return {
    ty: "gr",
    nm: name,
    it: shapeItems,
  };
}

// --- Main ---
function main() {
  console.log("Loading Lottie file...");
  const raw = fs.readFileSync(LOTTIE_PATH, "utf8").replace(/^\uFEFF/, "");
  const lottie = JSON.parse(raw);

  // Get "AIR" path (light weight)
  console.log("Extracting AIR glyphs (Segoe UI Light)...");
  const airSvgPath = getTextPath(FONT_LIGHT, "AIR", TEXT_X, TEXT_Y, FONT_SIZE);
  const airContours = svgPathToLottieShape(airSvgPath);
  console.log(`  → ${airContours.length} contours`);

  // Calculate AIR width to position IMPULS
  const airWidth = getTextWidth(FONT_LIGHT, "AIR", FONT_SIZE);
  console.log(`  → AIR width: ${airWidth.toFixed(1)}px`);

  // Get "IMPULS" path (bold weight)
  const impulseX = TEXT_X + airWidth + LETTER_SPACING;
  console.log(`Extracting IMPULS glyphs (Segoe UI Bold) at x=${impulseX.toFixed(1)}...`);
  const impulseSvgPath = getTextPath(FONT_BOLD, "IMPULS", impulseX, TEXT_Y, FONT_SIZE);
  const impulseContours = svgPathToLottieShape(impulseSvgPath);
  console.log(`  → ${impulseContours.length} contours`);

  // Combine all contours
  const allContours = [...airContours, ...impulseContours];
  console.log(`Total contours: ${allContours.length}`);

  // Build shape group
  const textShapeGroup = buildLottieShapeGroup("AIRIMPULS Text", allContours, FILL_COLOR);

  // Inject into Layer 3 (AIRIMPULS — text layer)
  const textLayer = lottie.layers[3];
  if (!textLayer.nm.startsWith("AIRIMPULS")) {
    console.error("ERROR: Layer 3 is not AIRIMPULS*, got:", textLayer.nm);
    process.exit(1);
  }
  textLayer.nm = "AIRIMPULS";

  textLayer.shapes = [textShapeGroup];
  // Reset position animation to [0,0] since text is already positioned via glyph coordinates
  textLayer.ks.p = {
    a: 0,
    k: [0, 0, 0],
  };

  console.log("Writing updated Lottie file...");
  fs.writeFileSync(LOTTIE_PATH, JSON.stringify(lottie));
  console.log("Done! Text injected into AIRIMPULS layer.");

  // Verify
  const verify = JSON.parse(fs.readFileSync(LOTTIE_PATH, "utf8"));
  console.log(`Layer 3 shapes: ${verify.layers[3].shapes.length}`);
}

main();
