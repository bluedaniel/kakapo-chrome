// import path from "path";
import task from "./lib/task";
import copy from "./lib/copy";
import fs from "fs-extra";

// import watch from "./lib/watch";

export default task("copy", async () => {
  await Promise.all([
    fs.copySync("manifest.json", "build/manifest.json"),
    copy("src/data", "build/data"),
    copy("src/i18n", "build/i18n"),
    copy("src/icons", "build/icons"),
    copy("src/favicons", "build/favicons"),
    copy("src/bg", "build/bg"),
    copy("src/browser_action", "build/browser_action")
  ]);

  // if (global.WATCH) {
  //   const watcher = await watch("src/content/**/*.*");
  //   watcher.on("changed", async (file) => {
  //     const relPath = file.substr(path.join(__dirname, "../src/content/").length);
  //     await copy(`src/content/${relPath}`, `build/content/${relPath}`);
  //   });
  // }
});
