let w = 500;
let h = 300;
let pad = 30;

let dataset = [];
let numDataPoints = 0;
let maxRange = Math.random() * 1000;
for(let i=0; i<numDataPoints; i++) {
  let newNumber1 = Math.floor(Math.random() * maxRange);
  let newNumber2 = Math.floor(Math.random() * maxRange);
  dataset.push([newNumber1, newNumber2]);
}


let xScale = d3.scaleLinear()
.domain([
  0, 
  d3.max(dataset, (d) => { return d[0]; })
])
.range([pad, w-pad * 2]);

let yScale = d3.scaleLinear()
.domain([
  0,
  d3.max(dataset, (d) => { return d[1]; })
])
.range([h-pad, pad]);

let xAxis = d3.axisBottom()
.scale(xScale)
.ticks(5);

let yAxis = d3.axisLeft()
.scale(yScale)
.ticks(5);

let svg = d3.select("body")
.append("svg")
.attr("width", w)
.attr("height", h);

svg.append("clipPath")
  .attr("id", "chart-area")
  .append("rect")
  .attr("x", pad)
  .attr("y", pad)
  .attr("width", w - pad * 3)
  .attr('height', h - pad * 2);

svg.append("g")
  .attr('id', "circles")
  .attr("clip-path", "url(#chart-area)")
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => { return xScale(d[0]); })
  .attr("cy", (d) => { return yScale(d[1]); })
  .attr("r", 2);

svg.append('g')
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (h-pad) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + pad + ",0)")
  .call(yAxis);

console.log("Here");
d3.select("p")
  .on("click", () => {
    let numValues = dataset.length;
    let maxRange = Math.random() * 1000;
    dataset = [];

    for(let i=0; i<numValues; i++){
      let newNumber1 = Math.floor(Math.random() * maxRange);
      let newNumber2 = Math.floor(Math.random() * maxRange);
      dataset.push([newNumber1, newNumber2]);
    }

    xScale.domain([0, d3.max(dataset, (d) => { return d[0]; })]);
    yScale.domain([0, d3.max(dataset, (d) => { return d[1]; })]);

    svg.selectAll("circle")
      .data(dataset)
      .transition()
      .duration(1000)
      .on("start", () => {
        d3.select(this)
          .attr("fill", "magenta")
          .attr("r", 7);
      })
      .attr("cx", (d) => { return xScale(d[0]); })
      .attr("cy", (d) => { return yScale(d[1]); })
      .on("end", () => {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr("fill", "black")
          .attr("r", 2);
      });
    svg.select(".x.axis")
      .transition()
      .duration(1000)
      .call(xAxis);
    svg.select(".y.axis")
      .transition()
      .duration(1000)
      .call(yAxis);
  });

