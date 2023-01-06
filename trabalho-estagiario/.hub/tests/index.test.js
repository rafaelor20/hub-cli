const childProcess = require("child_process");
const fs = require('fs');
const DIR_BASE = './';

describe("Exercício Traballho Estagiário",  () => {

  it("deveria criar 100 arquivos ", () => {

    childProcess.execSync("node index.js");
    let countFiles = 0;
    const files = fs.readdirSync(DIR_BASE);
    files.forEach(file => {
      if (file.includes('.txt')) {
        countFiles += 1;
      }
    })
  
    expect(countFiles).toEqual(100);
  });

  it("deveria conter o texto correto no arquivo ", () => {

    const randFile = Math.floor(Math.random() * 101);
    let text = `Lista 1 - Cálculo 1 - Exercício ${randFile}`;
    const content = fs.readFileSync(`${DIR_BASE}/${randFile}.txt`).toString();
    console.log(content)
  
    expect(content).toEqual(`Lista 1 - Cálculo 1 - Exercício ${randFile}`);
  })

});
