import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import ffmpegStatic from "ffmpeg-static";

const LOTTIE_FILE = path.join(process.cwd(), "public/animations/airimpuls-logo.json");
const TEMP_DIR = path.join(process.cwd(), ".temp-frames");
const OUTPUT_FILE = path.join(process.cwd(), "public/animations/airimpuls-logo.gif");

async function run() {
  console.log("Reading Lottie JSON...");
  const lottieData = JSON.parse(fs.readFileSync(LOTTIE_FILE, "utf-8"));

  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
  } else {
    // Clear old frames
    for (const file of fs.readdirSync(TEMP_DIR)) {
      fs.unlinkSync(path.join(TEMP_DIR, file));
    }
  }

  console.log("Starting Playwright...");
  const browser = await chromium.launch();
  // Render at a much larger size (1000x1000) for super-sampling (anti-aliasing)
  const page = await browser.newPage({
    viewport: { width: 1000, height: 1000 },
    deviceScaleFactor: 2
  });

  // Create an HTML page with Lottie Web
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js"></script>
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
          #lottie-container {
            width: 80%;
            height: 80%;
          }
        </style>
      </head>
      <body>
        <div id="lottie-container"></div>
      </body>
    </html>
  `);

  console.log("Loading animation in browser...");
  await page.waitForFunction(() => typeof lottie !== 'undefined');

  await page.evaluate((animationData) => {
    window.anim = undefined;
    window.animReady = new Promise(resolve => {
      window.anim = lottie.loadAnimation({
        container: document.getElementById('lottie-container'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: animationData,
      });
      window.anim.addEventListener('DOMLoaded', () => resolve());
    });
  }, lottieData);

  // Wait for it to load
  await page.waitForFunction(() => window.anim !== undefined);
  await page.evaluate(() => window.animReady);

  // Get animation info
  const { totalFrames, frameRate } = await page.evaluate(() => {
    return {
      totalFrames: window.anim.totalFrames,
      frameRate: window.anim.frameRate
    };
  });

  console.log(`Rendering ${totalFrames} frames at ${frameRate} FPS...`);

  const container = page.locator('#lottie-container');

  for (let i = 0; i < totalFrames; i++) {
    // Go to exact frame and force SVG update
    await page.evaluate((frame) => {
      window.anim.goToAndStop(frame, true);
    }, i);

    // Give the browser a microtick to render SVG updates
    await page.waitForTimeout(5);

    const framePath = path.join(TEMP_DIR, `frame-${String(i).padStart(4, '0')}.png`);
    await container.screenshot({ path: framePath, omitBackground: true });

    if (i % 20 === 0) console.log(`Processed frame ${i}/${totalFrames}`);
  }

  await browser.close();

  console.log("Generating GIF with FFmpeg...");

  // Super-sampling: scale down from 1000px to 500px using Lanczos for extremely sharp but smooth edges.
  // We use max_colors=256 and a very light sierra2_4a dither to maintain gradients while avoiding speckling.
  const inputPattern = path.join(TEMP_DIR, 'frame-%04d.png');
  const paletteFilter = `[0:v]scale=500:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256:reserve_transparent=1[p];[s1][p]paletteuse=dither=sierra2_4a:alpha_threshold=128`;

  const ffmpegCmd = `"${ffmpegStatic}" -y -framerate ${frameRate} -i "${inputPattern}" -vf "${paletteFilter}" "${OUTPUT_FILE}"`;

  execSync(ffmpegCmd, { stdio: 'inherit' });

  console.log(`Success! GIF saved to ${OUTPUT_FILE} `);
}

run().catch(console.error);
