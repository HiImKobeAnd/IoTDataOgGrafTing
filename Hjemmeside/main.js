import './style.css'
import Chart from 'chart.js/auto'
import Pocketbase from "pocketbase"

document.querySelector('#app').innerHTML = `
  <div>
  <canvas id="myChart" style="width:100%;max-width:600px"></canvas>
  </div>
`
const pb = new Pocketbase('http://192.168.1.23:80');

let response = await pb.collection("temp").getFullList(100, {sort: "created"})

pb.collection("temp").subscribe("*", function (e) {
  console.log(e.record)
})

//console.log(response)

let xValues = [50,60,70,80,90,100,110,120,130,140,150];
let yValues = [7,8,8,9,9,9,10,11,14,14,15];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});