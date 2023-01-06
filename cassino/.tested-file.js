function randomNumber(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


const luckNumber = randomNumber(2, 12);
console.log(`Seu número da sorte é: ${luckNumber}`);
console.log("Jogando dados...");
setTimeout(() => {
    const firstNumber = randomNumber(1, 6);
    const secondNumber = randomNumber(1, 6);
    if (firstNumber === secondNumber || firstNumber + secondNumber === luckNumber) {
        console.log("Você ganhou!");
    } else {
        console.log("Você perdeu");
    }
}, 2000)

