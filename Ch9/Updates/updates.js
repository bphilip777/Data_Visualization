let w = 600;
let h = 250;
let pad = 30;
let dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
// Use a random dataset
let maxValue = d3.max(dataset);
let numValues = dataset.length;
dataset = [];
for(let i=0; i<numValues; i++) {
  let newNumber = Math.floor(Math.random() * maxValue);
  dataset.push(newNumber);
}


// Scales
let xScale = d3.scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w]) // more efficient
  // .range([0, w])
  // .round(true) // enable rounding for sharper edges
  .paddingInner(0.05);

let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, h-pad]);

// Create SVG image
let svg = d3.select('body')
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// Create bar chart
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d, i) => {
    return xScale(i);
  })
  .attr("y", (d) => {
    return h - yScale(d);
  })
  .attr("width", xScale.bandwidth())
  .attr("height", (d) => {
    return yScale(d);
  })
  .attr("fill", (d) => {
    return "rgb(0, 0, " + Math.round(d*10) + ")";
  });

// Text 
svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => {
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("x", (d, i) => {
    return xScale(i) + xScale.bandwidth() / 2; 
  })
  .attr("y", (d) => {
    return h - yScale(d) + 14;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "white");

// Events
d3.select("p")
  .on("click", function() {
    // alert("Hey don't click that!");
    // Change data on click
    dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
      5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];

    // rebind the data - only works if dataset is of the same size
    svg.selectAll("rect")
      .data(dataset)
      .transition() // makes the change smooth
      .delay((d,i) => {
        return i * 100 / dataset.length; // normalized by amount of data
      })
      .duration(1000) // 150ms for small changes, 1s for larger changes
      .ease(d3.easeCubicInOut)
      .attr("y", (d) => {
        return h - yScale(d);
      })
      .attr("height", (d) => {
        return yScale(d);
      })
      .attr("fill", (d) => {
        return "rgb(0, 0, " + Math.round(d*10) + ")";
      });

    // Update labels
    svg.selectAll("text")
      .data(dataset)
      .transition()
      .delay((d, i) => {
        return i * 100 / dataset.length; // Normalized by amount of data 
      })
      .duration(1000)
      .ease(d3.easeCubicInOut)
      .text((d) => {
        return d;
      })
      .attr("x", (d, i) => {
        return xScale(i) + xScale.bandwidth() / 2;
      })
      .attr("y", (d) => {
        return h-yScale(d) + 14;
      });
  });


