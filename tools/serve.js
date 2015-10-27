import task from "./lib/task";

global.WATCH = true;

export default task("serve", async () => {
  await require("./build")();
});
