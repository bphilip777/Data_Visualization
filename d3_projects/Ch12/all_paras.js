// Learning about filter function
// Uses basic html + no css
let dataset = [];

for(let i=0; i<=25; i+=5) {
  dataset.push(i);
}

let allParas = d3.select("body")
  .selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text(d => "I can count up to " + d);

let redParas = allParas.filter(d => d > 15)
  .style("color", "red");

