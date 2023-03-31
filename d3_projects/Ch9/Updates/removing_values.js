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

// create a paragraph
let p1 = d3.select("body")
  .append("p")
  .attr("id", "add")
  .text("Click to add data");

let p2 = d3.select("body")
  .append("p")
  .attr("id", "sub")
  .text("Click to remove data.");

let svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", (d, i) => { return xScale(i); })
  .attr("y", (d) => { return h-yScale(d); })
  .attr("width", xScale.bandwidth())
  .attr("height", (d) => { return yScale(d); })
  .attr("fill", (d) => { return "rgb(0, 0, "+ Math.round(d*10) +")";});

svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text((d) => { return d; })
  .attr("text-anchor", "middle")
  .attr("x", (d, i) => { return xScale(i) + xScale.bandwidth() / 2; })
  .attr("y", (d) => { return h - yScale(d) + 14; })
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "white");


p2.on("click", () => console.log("P2 was clicked!"));

d3.select("p")
  .on("click", () => {
    // Removes value from dataset - can also use pop()
    dataset.pop();
    // Rescale data 
    xScale.domain(d3.range(dataset.length))
    yScale.domain([0, d3.max(dataset)]);
    // Grab rect
    let bars = svg.selectAll("rect")
      .data(dataset);
    // Update new data
    bars.enter()
      .append("rect")
      .attr("x", w)
      .attr("y", (d) => { return h-yScale(d); })
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => { return yScale(d); })
      .attr("fill", (d) => { return "rgb(0, 0, "+ Math.round(d*10) +")";})
      .merge(bars)
      .transition()
      .duration(500)
      .attr("x", (d,i) => { return xScale(i); })
      .attr("y", (d) => { return h - yScale(d); })
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => { return yScale(d); });
    // Remove old data
    bars.exit()
      .transition()
      .duration(500)
      .attr("x", w)
      .remove();
    // Update text
    let text = svg.selectAll("text")
      .data(dataset);

    text.enter()
      .append("text")
      .merge(text)
      .transition()
      .duration(500)
      .text((d) => { return d; })
      .attr("x", (d,i) => { return xScale(i) + xScale.bandwidth() / 2; })
      .attr("y", (d) => { return h - yScale(d) + 14; });

    text.exit()
      .transition()
      .duration(500)
      .attr("x", w)
      .remove(); // delete element from DOM
  })
