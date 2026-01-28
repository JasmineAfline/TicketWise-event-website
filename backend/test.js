console.log("Node version:", process.version);
console.log("Current directory:", process.cwd());
console.log("Files in models directory:");
const fs = require("fs");
fs.readdirSync("./src/models").forEach(file => console.log(" - " + file));
