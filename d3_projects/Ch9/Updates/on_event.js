let w = 800;
let h = 600;
let pad = 30;
let transitionTime = 1000;

let dataset = [];
let numDataPoints = 50;
let maxRange = Math.random() * 1000;
for(let i=0; i<numDataPoints; i++) {
  let newNumber1 = Math.floor(Math.random() * maxRange);
  let newNumber2 = Math.floor(Math.random() * maxRange);
  dataset.push([newNumber1, newNumber2]);
};

// Scales
let xScale = d3.scaleLinear()
  .domain([
    0, 
    d3.max(dataset, (d) => { return d[0]; })
  ])
  .range([pad, w-pad*2]);

let yScale = d3.scaleLinear()
  .domain([
    0, 
    d3.max(dataset, (d) => { return d[1]; })])
  .range([h-pad, pad]);

// Axes
let xAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(5);

let yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(5);

let svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr('height', h);

// Circles
svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", (d) => {return xScale(d[0]); })
  .attr("cy", (d) => {return yScale(d[1]); })
  .attr("r", 2)
  .style("fill", "magenta");

// Axes
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0, " + (h-pad) + ")") // (h-pad) =/= h-pad
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + pad + ",0)")
  .call(yAxis);

// Interaction
d3.select("p")
  .on("click", () => {
    // Update data
    let numValues = dataset.length;
    let maxRange = Math.random() * 1000;
    dataset = [];
    for(let i=0; i<numValues; i++) {
      let newNumber1 = Math.floor(Math.random() * maxRange);
      let newNumber2 = Math.floor(Math.random() * maxRange);
      dataset.push([newNumber1, newNumber2]);
    }

    // Update scales
    xScale.domain([0, d3.max(dataset, (d) => {return d[0]; })]);
    yScale.domain([0, d3.max(dataset, (d) => {return d[1]; })]);
    
    // Update circles
    svg.selectAll("circle")
      .data(dataset)
      .transition()
      .duration(transitionTime)
      .on("start", () => {
        // @ anim start
        d3.select(this)
          .style("fill", "magenta")
          .attr("r", 3);
      })
      .attr("cx", (d) => { return xScale(d[0]); })
      .attr("cy", (d) => { return yScale(d[1]); })
      .on("end", () => {
        // @ anim end
        d3.select(this)
          .attr("fill", "black")
          .attr("r", 2);
      });

    // Update Axes
    svg.select(".x.axis")
      .transition()
      .duration(transitionTime)
      .call(xAxis);

    svg.select(".y.axis")
      .transition()
      .duration(transitionTime )
      .call(yAxis);
  });

