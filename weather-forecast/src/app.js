import express from "express";

const forecast = [
  { day: 1, temperature: "32 °C", wind: "8 km/h", views: 0 },
  { day: 2, temperature: "27 °C", wind: "9 km/h", views: 0 },
  { day: 3, temperature: "30 °C", wind: "8 km/h", views: 0 },
  { day: 4, temperature: "32 °C", wind: "7 km/h", views: 0 },
  { day: 5, temperature: "31 °C", wind: "8 km/h", views: 0 },
  { day: 6, temperature: "26 °C", wind: "10 km/h", views: 0 },
  { day: 7, temperature: "27 °C", wind: "9 km/h", views: 0 }
];

function findDay(day) {
  day = Number(day);
  console.log(forecast[0].day);
  for (let i = 0; i < forecast.length; i++) {
    if (forecast[i].day === day) {
      return forecast[i];
    }
  }
  return false;
}

const server = express();

server.get("/forecast", (req, res) => {
  res.send(forecast);
})

server.get("/forecast/:day", (req, res) => {
  const day = req.params.day;
  const travelDay = findDay(day);
  travelDay.view = travelDay.view + 1;
  if (travelDay) {
    res.send(travelDay);
  } else {
    res.send("Erro!");
  }
});

server.listen(5000);