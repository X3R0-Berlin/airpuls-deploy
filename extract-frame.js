const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const path = require('path');

const input = path.join(__dirname, 'public/animations/airimpuls-logo.gif');
const output = path.join(__dirname, 'public/images/Airimpuls_Logo.png');

console.log("Extracting first frame...");
execSync(`"${ffmpeg}" -y -i "${input}" -vframes 1 "${output}"`, { stdio: 'inherit' });
console.log("Done.");
