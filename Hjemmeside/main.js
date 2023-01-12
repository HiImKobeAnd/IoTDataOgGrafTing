import "./style.css";
import Chart, { Colors } from "chart.js/auto";
import Pocketbase from "pocketbase";
const pb = new Pocketbase("http://192.168.0.112:80");

// * HTML setuper
document.querySelector("#app").innerHTML = `
  <div>
  <canvas id="myChart" style="width:100vw;max-width:600vh"></canvas>
  </div>
`;

// * setup of chart
let temperatures = [];
let timestamps = [];

let allRecords = await pb
  .collection("temp")
  .getFullList(100, { sort: "created" });

for (let x in allRecords) {
  temperatures.push(allRecords[x].temperatur);
  timestamps.push(allRecords[x].created);
}

const data = {
  labels: timestamps,
  datasets: [
    {
      label: "temperatur",
      data: temperatures,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
    },
  ],
};

let config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Temperatur til tid",
      },
    },
  },
};

let chart = new Chart("myChart", config);

// * Realtime integration
pb.collection("temp").subscribe("*", function (e) {
  chart.data.labels.push(e.record.created);
  chart.data.datasets[0].data.push(e.record.temperatur);
  chart.update();
});
