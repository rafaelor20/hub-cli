const { runTimedProcess } = require('./runner.cjs');

beforeEach(() => {
  jest.setTimeout(15 * 1000);
});

let start = 0;

function expectCloseTime(time, expected) {
  time -= start;
  const delta = Math.abs(expected - time);

  if (delta > 140) {
    throw new Error(
      `Esperava que a mensagem fosse impressa próximo de ${expected}ms mas foi impressa em ${time}ms!`
    );
  }
}

function getMessageAlike(messages, wanted) {
  return messages.find((message) =>
    message.message.toLowerCase().includes(wanted.toLowerCase())
  );
}

function expectMessage(message, expected) {
  if (!message) {
    throw new Error(`Esperava "${expected}" impresso!`);
  }
}

function expectFormat(message, regex, expected) {
  if (!regex.test(message)) {
    throw new Error(expected);
  }
}

describe('Exercício cassino', () => {
  it('deveria imprimir o número da sorte com o número colorido', async () => {
    const result = await runTimedProcess('node .tested-file.cjs', 8000);
    start = result[0].time;
    const message = getMessageAlike(result, 'seu número da sorte é');

    console.log(message.message);
    expectMessage(message, 'seu número da sorte é');
    expectCloseTime(message.time, 0);
    expectFormat(
      message.message,
      /\[BLUE\]Seu número da sorte é: [0-9]+\[\/BLUE\]/,
      'Esperava que o número da sorte estivesse azul!'
    );
  }, 15000);

  it("deveria imprimir 'Jogando dados...'", async () => {
    const result = await runTimedProcess('node .tested-file.cjs', 8000);
    start = result[0].time;
    const message = getMessageAlike(result, 'jogando dados...');

    expectMessage(message, 'jogando dados...');
    expectCloseTime(message.time, 0);
  }, 15000);

  it("deveria imprimir 'primeiro dado...'", async () => {
    const result = await runTimedProcess('node .tested-file.cjs', 8000);
    start = result[0].time;
    const message = getMessageAlike(result, 'primeiro dado');

    expectMessage(message, 'primeiro dado');
    expectCloseTime(message.time, 2000);
  }, 15000);

  it("deveria imprimir 'segundo dado...'", async () => {
    const result = await runTimedProcess('node .tested-file.cjs', 8000);
    start = result[0].time;
    const message = getMessageAlike(result, 'segundo dado');

    expectMessage(message, 'segundo dado');
    expectCloseTime(message.time, 4000);
  }, 15000);

  it("deveria imprimir 'você ganhou/perdeu...'", async () => {
    const result = await runTimedProcess('node .tested-file.cjs', 8000);
    start = result[0].time;
    const message =
      getMessageAlike(result, 'ganhou') || getMessageAlike(result, 'perdeu');

    expectMessage(message, 'você ganhou/perdeu');
    expectCloseTime(message.time, 5000);

    if (message.message.toLowerCase().indexOf('ganhou') > -1) {
      expectFormat(
        message.message,
        /\[GREEN\].*\[\/GREEN\]/,
        `Esperava "Você ganhou!" verde!`
      );
    } else {
      expectFormat(
        message.message,
        /\[RED\].*\[\/RED\]/,
        `Esperava "Você perdeu" vermelho!`
      );
    }
  }, 15000);
});
