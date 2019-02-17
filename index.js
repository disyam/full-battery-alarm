const util = require("util");
const exec = util.promisify(require("child_process").exec);

async function start() {
  try {
    let [{ stdout: capacity }, { stdout: status }] = await Promise.all([
      exec("cat /sys/class/power_supply/BAT0/capacity"),
      exec("cat /sys/class/power_supply/BAT0/status")
    ]);
    while (Number(capacity.trim()) >= 95 && status.trim() === "Charging") {
      await exec("paplay alarm.ogg");
      const { stdout } = await exec("cat /sys/class/power_supply/BAT0/status");
      status = stdout;
    }
  } catch (error) {
    throw error;
  }
}

start();
