import express from 'express';

const server = express(); // Cria um servidor
server.listen(5000);
server.send("Meu primeiro servidor, yay!");