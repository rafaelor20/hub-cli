const fs = require("fs");
const childProcess = require("child_process");
const path = require("path");

function executarTestes() {
  const process = childProcess.exec("docker-compose -f .hub/docker-compose.test.yml --env-file .env up --build");
  process.stdout.on("data", data => console.log(data.toString()));
  process.stderr.on("data", data => console.error(data.toString()));
}

function criarArquivoTestável(arquivo) {
  const basePath = path.join(__dirname, "..", "..");
  console.log(`Testando arquivo "${arquivo}"`);
  fs.copyFileSync(path.join(basePath, arquivo), path.join(basePath, ".tested-file.js"));
}

function main() {
  console.log("Iniciando testes, por favor aguarde...");
  childProcess.execSync("npm i");
  const readline = require("readline-sync");
  
  const arquivos = fs.readdirSync(path.join(__dirname, "..", ".."));
  const arquivosJs = [];
  for (const arquivo of arquivos) {
    if (arquivo.indexOf(".js") === arquivo.length - 3 && arquivo !== ".tested-file.js") {
      arquivosJs.push(arquivo);
    }
  }

  if (arquivosJs.length === 1) {
    criarArquivoTestável(arquivosJs[0]);
  } else {
    const escolha = readline.keyInSelect(arquivosJs, "Escolha o arquivo para testar: ");
    if (escolha === -1) process.exit(0);
    criarArquivoTestável(arquivosJs[escolha]);
  }

  executarTestes(); 
}

main();
