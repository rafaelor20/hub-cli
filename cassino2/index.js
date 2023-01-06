//Seu lindo código aqui :)
import randomNumber from "./randomNumber.js";
import chalk from "chalk";

const luckNumber = randomNumber(2, 12);
console.log(`Seu número da sorte é: ${luckNumber}`);
console.log("Jogando dados...");
setTimeout(() => {
    const firstNumber = randomNumber(1, 6);
    const secondNumber = randomNumber(1, 6);
    if (firstNumber === secondNumber || firstNumber + secondNumber === luckNumber) {
        console.log(chalk.green("Você ganhou!"));
    } else {
        console.log(chalk.red("Você perdeu"));
    }
}, 2000)