const fs = require("fs");
const childProcess = require("child_process");
const path = require("path");

function backupFile(filename) {
  fs.copyFileSync(path.join(__dirname, filename), path.join(__dirname, `${filename}.backup`));
}

function restoreBackup(filename) {
  fs.rmSync(path.join(__dirname, filename));
  fs.renameSync(path.join(__dirname, `${filename}.backup`), path.join(__dirname, filename));
}

function runTests() {
  const process = childProcess.exec("npx jest -i --color");
  process.stdout.on("data", data => console.log(data.toString()));
  process.stderr.on("data", data => console.error(data.toString()));

  process.on("exit", () => {
    fs.rmSync(path.join(__dirname, "node_modules"), { recursive: true, force: true });
    restoreBackup("package.json");
    restoreBackup("package-lock.json");
  });
}

function createTestFile(file) {
  console.log(`Testando arquivo "${file}"`);
  const basePath = path.join(__dirname, "..", "..");
  const fakeModuleRuntime = require("./fakeModuleRuntime.cjs");
  fs.writeFileSync(path.join(basePath, ".tested-file.cjs"), fakeModuleRuntime.insertFakeModuleRuntime(file));
}

function main() {
  console.log("Iniciando testes, por favor aguarde...");

  backupFile("package.json");
  backupFile("package-lock.json");

  childProcess.execSync("cd .hub/tests && npm i 2> /dev/null");
  const readline = require("readline-sync");
  
  const files = fs.readdirSync(path.join(__dirname, "..", ".."));
  const jsFiles = [];
  for (const file of files) {
    if (file.indexOf(".js") === file.length - 3 && file !== ".tested-file.js") {
      jsFiles.push(file);
    }
  }

  if (jsFiles.length === 1) {
    createTestFile(jsFiles[0]);
  } else {
    const choice = readline.keyInSelect(jsFiles, "Escolha o arquivo para testar: ");
    if (choice === -1) process.exit(0);
    createTestFile(jsFiles[choice]);
  }

  runTests(); 
}

main();
