//Width and height
let w = 600;
let h = 250;

let dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
  11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

let xScale = d3.scaleBand()
.domain(d3.range(dataset.length))
.rangeRound([0, w])
.paddingInner(0.05);

let yScale = d3.scaleLinear()
.domain([0, d3.max(dataset)])
.range([0, h]);

//Create SVG element
let svg = d3.select("body")
.append("svg")
.attr("width", w)
.attr("height", h);

//Create bars
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (_, i) => xScale(i))
  .attr("y", d => h - yScale(d))
  .attr("width", xScale.bandwidth())
  .attr("height", d => yScale(d))
  .attr("fill", d => "rgb(0, 0, " + Math.round(d * 10) + ")")
  .on("click", d => console.log(d));

//Create labels
svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(d => d)
  .attr("text-anchor", "middle")
  .attr("x", (_, i) => xScale(i) + xScale.bandwidth() / 2)
  .attr("y", d => h - yScale(d) + 14)
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "white");
