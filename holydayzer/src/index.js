import express from "express";

const holidays = [
  { date: "1/1/2023", name: "Confraternização mundial" },
  { date: "1/3/2023", name: "Carnaval" },
  { date: "4/17/2023", name: "Páscoa" },
  { date: "4/21/2023", name: "Tiradentes" },
  { date: "5/1/2023", name: "Dia do trabalho" },
  { date: "6/16/2023", name: "Corpus Christi" },
  { date: "9/7/2023", name: "Independência do Brasil" },
  { date: "10/12/2023", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2023", name: "Finados" },
  { date: "11/15/2023", name: "Proclamação da República" },
  { date: "12/25/2023", name: "Natal" }
];

function isHolyday(){
    let hoje = new Date();
    //let hoje = "1/1/2023";
    hoje.toLocaleDateString("en-us");
    for(let i = 0; i<holidays.length; i++){
        if (hoje === holidays[i].date){
            return `Sim, hoje é ${holidays[i].name}`;
        } else {
            return "Não, hoje não é feriado";
        }
    }
}

const server = express();

server.get("/holidays", (req, res) => {
    res.send(holidays);
})

server.get("/is-today-holiday", (req, res) => {
    res.send(isHolyday());
})


server.listen(5000);