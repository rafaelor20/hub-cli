# Cassino

Você foi a um cassino e ficou viciado com um jogo de dados. Infelizmente você esqueceu de ler o horóscopo e Marte estava com o lado errado virado para a Lua, e, consequentemente, foi um dia de muito azar, o que te fez perder muito dinheiro 😱

Depois de voltar para casa não conseguia parar de pensar no jogo, mas não tinha dinheiro para comprar dados ☹️ Decidiu então que deveria implementar esse jogo em Node, para recuperar todo o dinheiro perdido! 🤑

- O jogo funciona da seguinte forma: inicialmente, um número da sorte entre 2 e 12 é escolhido aleatoriamente.
- O programa deve imprimir **"Seu número da sorte é: x"**
- Em seguida, deve-se imprimir a frase **"Jogando dados..."**
- O programa então aguarda 2 segundos e sorteia um número de 1 a 6, imprimindo a frase **"Você tirou x no primeiro dado!"**
- O programa então aguarda mais 2 segundos e sorteia outro número de 1 a 6, imprimindo a frase **"Você tirou x no segundo dado!"**
- Por fim o programa deve aguardar 1 segundo e imprimir **"Você ganhou!"** ou **"Você perdeu"**. Você ganhará se os dois dados tiram o mesmo número ou se a soma dos números for igual ao número da sorte🤞

**Dica**: para gerar um número aleatório entre um valor mínimo e máximo, você pode usar a função abaixo:

```jsx
function randomNumber(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
```