//Width and height
let w = 600;
let h = 300;
let padding = 40;

//Dynamic, random dataset
let dataset = [];					//Initialize empty array
let numDataPoints = 200;			//Number of dummy data points to create
let xRange = 1000;					//Max range of new x values
let yRange = 1000;					//Max range of new y values
for (let i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
  let newNumber1 = Math.floor(Math.random() * xRange);	//New random integer
  let newNumber2 = Math.floor(Math.random() * yRange);	//New random integer
  dataset.push([newNumber1, newNumber2]);					//Add new number to array
}

//Create scale functions
let xScale = d3.scaleLinear()
.domain([0, 1000])
.range([padding, w - padding / 2]);

let yScale = d3.scaleLinear()
.domain([0, 1000])
.range([h - padding, padding / 2]);

//Define X axis
let xAxis = d3.axisBottom()
.scale(xScale)
.ticks(5);

//Define Y axis
let yAxis = d3.axisLeft()
.scale(yScale)
.ticks(5);

//Create SVG element
let svg = d3.select("body")
.append("svg")
.attr("width", w)
.attr("height", h);

//Create circles
let allCircles = svg.selectAll("circle")
.data(dataset)
.enter()
.append("circle")
.attr("cx", d => xScale(d[0]))
.attr("cy", yScale(d[1]))
.attr("r", 2.5);

//Create X axis
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);

//Create Y axis
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

//On radio button change, update styling
d3.selectAll("input")
  .on("click", () => {

    let threshold = +d3.select(this).node().value;

    allCircles.attr("fill", "black")
      .filter(d => d[0] <= threshold)
      .attr("fill", "red");

});
