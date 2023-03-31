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

// Create bars
// Can create highlights here or in css
// Can sort bars by passing fn to on click 
// can use browser tooltip by adding title to data 
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(_, i) { return xScale(i);})
  .attr("y", function(d) { return h - yScale(d);})
  .attr("width", xScale.bandwidth())
  .attr("height", function(d) { return yScale(d); })
  .attr("fill", function(d) {return "rgb(0, 0, " + Math.round(d * 10) + ")";})
  // .on("mouseover", function() {
  //   d3.select(this)
  //     .attr("fill", "orange");
  // })
  // .on("mouseout", function(d) {
  //   d3.select(this)
  //     .transition()
  //     .duration(250)
  //     .attr("fill", "rgb(0, 0, " + Math.round(d * 10) + ")");
  // })
  .on("click", ()=>sortBars())
  .append("title") // Browser tooltip - shows value of bar
  .text(function(d) {
    return "This value is " + d; // Now uses text for tooltip too
  })

// Create labels
svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d)=>d)
  .attr("text-anchor", "middle")
  .attr("x", (_, i)=>xScale(i) + xScale.bandwidth() / 2)
  .attr("y", (d)=>h - yScale(d) + 14)
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");

let sortOrder = false;

// Define sort fn
// allows ascending/descending alternating sorts 
// has delay for changing scale 
// has transition for rect + text
let sortBars = function() {
  sortOrder = !sortOrder;
  // Update rects 
  svg.selectAll("rect")
    .sort(function(a, b){
    if (sortOrder) {
      return d3.ascending(a,b);
    } else {
      return d3.descending(a,b);
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

  // Update text 
  svg.selectAll("text")
    .sort(function(a, b) {
      if (sortOrder) {
        return d3.ascending(a,b);
      } else {
        return d3.descending(a,b);
      }
    })
    .transition()
    .delay(function(_, i) {
      return i*50;
    })
    .duration(1000)
    .attr("x", function(_, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    });
};
