import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import ffmpegStatic from "ffmpeg-static";

const SVG_FILE = path.join(process.cwd(), "public/images/Airimpuls_Logo.svg");
const TEMP_DIR = path.join(process.cwd(), ".temp-frames");
const OUTPUT_FILE = path.join(process.cwd(), "public/animations/airimpuls-logo.gif");

async function run() {
    console.log("Reading Original SVG...");
    const svgContent = fs.readFileSync(SVG_FILE, "utf-8");

    if (!fs.existsSync(TEMP_DIR)) {
        fs.mkdirSync(TEMP_DIR);
    } else {
        for (const file of fs.readdirSync(TEMP_DIR)) {
            fs.unlinkSync(path.join(TEMP_DIR, file));
        }
    }

    console.log("Starting Playwright...");
    const browser = await chromium.launch();
    const page = await browser.newPage({
        viewport: { width: 1000, height: 1000 },
        deviceScaleFactor: 2
    });

    await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { 
            margin: 0; 
            padding: 0; 
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
          }
          #logo-container {
            width: 80%;
            height: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          svg {
            width: 100%;
            height: auto;
            transform-origin: center center;
            will-change: transform, opacity;
          }
        </style>
      </head>
      <body>
        <div id="logo-container">
          ${svgContent}
        </div>
      </body>
    </html>
  `);

    console.log("Rendering 120 frames of smooth CSS-like pulse animation at 30 FPS...");

    const totalFrames = 120; // 4 seconds at 30 fps
    const frameRate = 30;
    const container = page.locator('#logo-container');

    for (let i = 0; i < totalFrames; i++) {
        // 0 to 1 loop over 120 frames
        const progress = i / totalFrames;
        const angle = progress * Math.PI * 2; // Full sine wave cycle

        // Scale goes 1 -> 1.05 -> 1
        const scale = 1 + ((1 - Math.cos(angle)) / 2) * 0.05;

        // Opacity goes 1 -> 0.9 -> 1
        const opacity = 1 - ((1 - Math.cos(angle)) / 2) * 0.1;

        await page.evaluate(({ scale, opacity }) => {
            const svg = document.querySelector('svg');
            if (svg) {
                svg.style.transform = "scale(" + scale + ")";
                svg.style.opacity = opacity;
            }
        }, { scale, opacity });

        // Wait a tiny bit for style application
        await page.waitForTimeout(5);

        const framePath = path.join(TEMP_DIR, "frame-" + String(i).padStart(4, '0') + ".png");
        await container.screenshot({ path: framePath, omitBackground: true });

        if (i % 20 === 0) console.log("Processed frame " + i + "/" + totalFrames);
    }

    await browser.close();

    console.log("Generating high-quality GIF with FFmpeg...");

    const inputPattern = path.join(TEMP_DIR, 'frame-%04d.png');
    const paletteFilter = "[0:v]scale=500:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256:reserve_transparent=1[p];[s1][p]paletteuse=dither=sierra2_4a:alpha_threshold=128";

    const ffmpegCmd = '"' + ffmpegStatic + '" -y -framerate ' + frameRate + ' -i "' + inputPattern + '" -vf "' + paletteFilter + '" "' + OUTPUT_FILE + '"';

    execSync(ffmpegCmd, { stdio: 'inherit' });

    console.log("Success! Ultimate HQ GIF saved to " + OUTPUT_FILE);
}

run().catch(console.error);
