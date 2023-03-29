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

d3.select("p")
  .on("click", () => {
    // dataset.shift() // remove one value from dataset
    dataset.pop(); // removes last value from array - preserves the value each bar had before removal
    
    xScale.domain(d3.range(dataset.length))
    yScale.domain([0, d3.max(dataset)]);

    let bars = svg.selectAll("rect")
      .data(dataset);

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

    bars.exit()
      .transition()
      .duration(500)
      .attr("x", w)
      .remove();

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
