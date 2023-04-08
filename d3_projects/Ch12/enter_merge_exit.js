// Style guide: selections = 2 spaces, mods = 4 spaces
let w = 600, h = 300;

let dataset = [ { key: 0, value: 5 },		//dataset is now an array of objects.
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
  .domain([0, d3.max(dataset, d => d.value)])
  .range([0, h]);

let key = d => d.key;

let svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// console.log('svg.selectAll("rect")');
// console.log(svg.selectAll("rect"));

// console.log('svg.selectAll("rect").data(dataset, key)');
// console.log(svg.selectAll("rect").data(dataset, key));

// console.log('svg.selectAll("rect").data(dataset, key).enter()');
// console.log(svg.selectAll("rect").data(dataset, key).enter());

// console.log('svg.selectAll("rect").data(dataset, key).enter().append("rect")');
// console.log(svg.selectAll("rect").data(dataset, key).enter().append("rect"));

// Bars
svg.selectAll("rect")
  .data(dataset, key)
  .enter()
  .append("rect")
  .attr("x", (_, i) => xScale(i))
  .attr("y", d => h-yScale(d.value))
  .attr("width", xScale.bandwidth())
  .attr("height", d => yScale(d.value))
  .attr("fill", d => "rgb(0,0,"+ (d.value*10) +")");

// Labels
svg.selectAll("text")
  .data(dataset, key)
  .enter()
  .append("text")
  .text(d => d.value)
  .attr("text-anchor", "middle")
  .attr("x", (d,i) => xScale(i) + xScale.bandwidth() / 2)
  .attr("y", d => h-yScale(d.value) + 14)
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "white");

// Click + Update w/ new data 
d3.selectAll("p")
  .on("click", () => {
    let pID = d3.select(this).attr("id");
    if (pID == "add") {
      let minValue = 2;
      let maxValue = 25 - minValue;
      let newNumber = Math.floor(Math.random() * maxValue) + minValue;
      let lastKeyValue = dataset[dataset.length - 1].key;
      dataset.push({
        key: lastKeyValue + 1,
        value: newNumber
      });
    } else {
      // Remove value
      dataset.shift();
    }
    // Re-scale 
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(datsaset, d => d.value)]);

    // console.log('svg.selectAll("rect")');
    // console.log(svg.selectAll("rect"));

    // console.log('svg.selectAll("rect").data(dataset, key)');
    // console.log(svg.selectAll("rect").data(dataset, key));

    let bars = svg.selectAll("rect")
      .data(dataset, key);

    // console.log('bars.enter()');
    // console.log(bars.enter());

    // console.log('bars.enter().append("rect")');
    // console.log(bars.enter().append("rect"));

    // console.log('bars.enter().append("rect").merge(bars)');
    // console.log(bars.enter().append("rect").merge(bars));
    
    // Enter 
    bars.enter()
      .append("rect")
      .attr("x", w)
      .attr("y", d => h-yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.value))
      .attr("fill", d => "rgb(0,0,"+ (d.value*10) +")")
      .merge(bars)
      .transition()
      .merge(bars)
      .transition()
      .duration(500)
      .attr("x", (_, i) => xScale(i))
      .attr("y", d => h-yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.value));

    // console.log('bars.exit()');
    // console.log(bars.exit());

    // console.log('bars.exit().remove()');
    // console.log(bars.exit().remove());

    // Exit 
    bars.exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.bandwidth())
      .remove();

    // Update labels 
    let labels = svg.selectAll("text")
      .data(dataset, key);

    // Exit 
    labels.exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.bandwidth())
      .remove();

    // Enter 
    labels.enter()
      .append("text")
      .text(d => d.value) 
      .attr("text-anchor", "middle")
      .attr("x", w)
      .attr("y", d => h-yScale(d.value) + 14)
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .merge(labels)
      .transition()
      .duration(500)
      .attr("x", (d,i) => xScale(i) + xScale.bandwidth() / 2);

  })
