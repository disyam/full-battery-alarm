const cron = require("node-cron");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

cron.schedule("* * * * *", async () => {
  try {
    let [{ stdout: capacity }, { stdout: status }] = await Promise.all([
      exec("cat /sys/class/power_supply/BAT0/capacity"),
      exec("cat /sys/class/power_supply/BAT0/status")
    ]);
    while (
      Number(capacity.trim()) >= 95 &&
      (status.trim() === "Charging" || status.trim() === "Full")
    ) {
      await exec(`paplay ${__dirname}/alarm.ogg`);
      const { stdout } = await exec("cat /sys/class/power_supply/BAT0/status");
      status = stdout;
    }
  } catch (error) {
    throw error;
  }
});
