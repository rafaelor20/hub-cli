const { runTimedProcess } = require("./runner.cjs");

beforeAll(() => {
  jest.setTimeout(15 * 1000);
});

function expectCloseTime(time, expected) {
  const delta = Math.abs(expected - time);

  if (delta > 140) {
    throw new Error(`Esperava que a mensagem fosse impressa próximo de ${expected}ms mas foi impressa em ${time}ms!`);
  }
}

function getMessageAlike(messages, wanted) {
  return messages.find(message => message.message.toLowerCase().includes(wanted.toLowerCase()));
}

function expectMessage(message, expected) {
  if (!message) {
    throw new Error(`Esperava "${expected}" impresso!`);
  }
}

describe("Exercício cassino", () => {
  it("deveria imprimir o número da sorte", async () => {
    const result = await runTimedProcess("node .tested-file.js", 6000);
    const message = getMessageAlike(result, "seu número da sorte é");

    expectMessage(message, "seu número da sorte é");
    expectCloseTime(message.time, 0);
  });

  it("deveria imprimir 'Jogando dados...'", async () => {
    const result = await runTimedProcess("node .tested-file.js", 6000);
    const message = getMessageAlike(result, "jogando dados...");

    expectMessage(message, "jogando dados...");
    expectCloseTime(message.time, 0);
  });

  it("deveria imprimir 'primeiro dado...'", async () => {
    const result = await runTimedProcess("node .tested-file.js", 6000);
    const message = getMessageAlike(result, "primeiro dado");

    expectMessage(message, "primeiro dado");
    expectCloseTime(message.time, 2000);
  });

  it("deveria imprimir 'segundo dado...'", async () => {
    const result = await runTimedProcess("node .tested-file.js", 6000);
    const message = getMessageAlike(result, "segundo dado");

    expectMessage(message, "segundo dado");
    expectCloseTime(message.time, 4000);
  });

  it("deveria imprimir 'você ganhou/perdeu...'", async () => {
    const result = await runTimedProcess("node .tested-file.js", 6000);
    const message = getMessageAlike(result, "você ganhou") || getMessageAlike(result, "você perdeu");

    expectMessage(message, "você ganhou/perdeu");
    expectCloseTime(message.time, 5000);
  });
});
