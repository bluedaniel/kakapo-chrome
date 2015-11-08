// import path from "path";
import task from "./lib/task";
import copy from "./lib/copy";
import fs from "fs-extra";

export default task("copy", async () => {
  await Promise.all([
    fs.copySync("manifest.json", "build/manifest.json"),
    copy("node_modules/kakapo-assets/icons", "build/icons"),
    copy("node_modules/kakapo-assets/i18n", "build/i18n"),
    copy("node_modules/kakapo-assets/data", "build/data"),
    copy("src/favicons", "build/favicons"),
    copy("src/bg", "build/bg"),
    copy("src/browser_action", "build/browser_action")
  ]);
});
