const childProcess = require("child_process");

function runTimedProcess(command, timeout) {
  const logs = [];

  return new Promise((resolve) => {
    const process = childProcess.exec(command);
    const start = Date.now();

    process.stdout.on("data", data => {
      logs.push({
        message: data.toString(),
        time: Date.now() - start
      });
    });

    process.stderr.on("data", data => {
      logs.push({
        message: data.toString(),
        time: Date.now() - start
      });
    });

    setTimeout(() => resolve(logs), timeout);
  });
}

module.exports = {
  runTimedProcess
};
