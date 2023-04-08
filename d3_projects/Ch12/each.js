let w = 600, h = 300, pad = 40;

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
.attr("cy", d => yScale(d[1]))
.attr("r", 2.5)
.attr("fill", "black");

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

//On button click, execute a function for each circle in the allCircles selection
d3.selectAll("input")
  .on("click", () => allCircles.each(freakOut)  //Hold on to your hats!
);

//Define the freakOut function
let freakOut = function(_, i) {

  //Since this function will be called by 'each()',
  //it will be aware of each element on which it operates.
  //The 'this' context will be updated, and d and i will
  //be populated with the associated values.

  let colors = d3.schemeCategory20;
  let colorIndex = Math.round(Math.random() * 20);

  d3.select(this)
    .transition()
    .delay(i * 25)
    .duration(2000)
    .ease(d3.easeElasticOut)
    .attr("fill", colors[colorIndex])
    .attr("r", 25);

};
