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
  .attr("x", function(_, i) {
    return xScale(i);
  })
  .attr("y", function(d) {
    return h - yScale(d);
  })
  .attr("width", xScale.bandwidth())
  .attr("height", function(d) {
    return yScale(d);
  })
  .attr("fill", function(d) {
    return "rgb(0, 0, " + Math.round(d * 10) + ")";
  })
  .on("mouseover", function(_) {
    let yVal = yScale.invert(h-d3.select(this).attr("y"));
    // Get this bar's x/y values, then augment for the tooltip
    let xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
    let yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2 + 14;

    // Update the tooltip position and value
    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")						
      .select("#value")
      .text(yVal);

    // Show the tooltip
    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function() {

    //Hide the tooltip
    d3.select("#tooltip").classed("hidden", true);

  })
  .on("click", function() {
    sortBars();
});

svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(d => d)
  .attr("x", (_,i) => xScale(i) + xScale.bandwidth() / 2)
  .attr("y", d => h-yScale(d)+14)
  .attr("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-family", "sans-serif")
  .attr("font-weight", "bold")
  .attr("fill", "white");

//Define sort order flag
let sortOrder = false;

//Define sort function
let sortBars = function() {

  //Flip value of sortOrder
  sortOrder = !sortOrder;

  svg.selectAll("rect")
    .sort(function(a, b) {
      if (sortOrder) {
        return d3.ascending(a, b);
      } else {
        return d3.descending(a, b);
      }
    })
    .transition()
    .delay(function(_, i) {
      return i * 50;
    })
    .duration(1000)
    .attr("x", function(_, i) {
      return xScale(i);
  });

  svg.selectAll("text")
    .sort(function(a, b) {
      if (sortOrder) {
        return d3.ascending(a,b);
      } else {
        return d3.descending(a, b);
      }
    })
    .transition()
    .delay(function(_, i) {
      return i * 50;
    })
    .duration(1000)
    .attr("x", function(_, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    });
};			

