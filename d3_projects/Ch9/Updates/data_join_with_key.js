let w = 600;
let h = 250;

var dataset = [ { key: 0, value: 5 },		//dataset is now an array of objects.
							{ key: 1, value: 10 },		//Each object has a 'key' and a 'value'.
							{ key: 2, value: 13 },
							{ key: 3, value: 19 },
							{ key: 4, value: 21 },
							{ key: 5, value: 25 },
							{ key: 6, value: 22 },
							{ key: 7, value: 18 },
							{ key: 8, value: 15 },
							{ key: 9, value: 13 },
							{ key: 10, value: 11 },
							{ key: 11, value: 12 },
							{ key: 12, value: 15 },
							{ key: 13, value: 20 },
							{ key: 14, value: 18 },
							{ key: 15, value: 17 },
							{ key: 16, value: 16 },
							{ key: 17, value: 18 },
							{ key: 18, value: 23 },
							{ key: 19, value: 25 } ];

let xScale = d3.scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w])
  .paddingInner(0.05);

let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d.value) ])
  .range([h, 0]);

let key = d => d.key;

let svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

svg.selectAll("rect")
  .data(dataset, key) // somehow this is removing keys from dataset and leaving only value
  .enter()
  .append("rect")
  .attr("x", (d, i) => xScale(i))
  .attr("y", d => yScale(d.value))
  .attr("width", xScale.bandwidth())
  .attr("height", d => h - yScale(d.value))
  .attr("fill", d => "rgb(0, 0, "+ (d.value * 10) +")");

svg.selectAll("text")
  .data(dataset, key)
  .enter()
  .append("text")
  .text(d => d.value)
  .attr("text-anchor", "middle")
  .attr("x", (d, i) => xScale(i) + xScale.bandwidth()/2)
  .attr("y", d => yScale(d.value) + 14)
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr('fill', 'white');

// Interaction
d3.select("p")
  .on("click", () => {
    // Delete data at end - can swap with pop()
    dataset.shift();
    
    // Rescale
    xScale.domain(d3.range(dataset.length));
    yScale.domain(d3.range(dataset, d => d.value ))

    // select the bars
    let bars = svg.selectAll("rect")
      .data(dataset, key);
    
    // Remove old data 
    bars.exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.bandwidth())
      .remove();
    
    // Enter new data - there is none
    bars.enter()
      .append("rect")
      .attr("x", w)
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.value));

    // Adjust text 
    let text = svg.selectAll("text")
      .data(dataset, key);

    // Enter
    text.enter()
      .append("text")
      .merge(text)
      .transition()
      .duration(500)
      .text(d => d.value)
      .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2 )
      .attr("y", d => yScale(d.value) + 14);

    // Exit 
    text.exit()
      .transition()
      .duration(500)
      .attr("x", w)
      .remove();
    
  });


