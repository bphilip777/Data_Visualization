let parseTime = d3.timeParse("%m/%d/%y"); // converts dates to u32
let formatTime = d3.timeFormat("%b %e"); // converts mo to nu
let formatAsPercentage = d3.format(".1%");

let rowConverter = function(d) {
  return {
    date: parseTime(d.Date),
    amount: parseInt(d.Amount),
  };
}

// Load in data and analyze
d3.csv("./time_scale.csv", rowConverter)
  .then(function(data) {
    // Params
    let w = 800;
    let h = 600;
    let pad = 40;

    // Scales
    let xScale = d3.scaleTime()
      .domain([
        d3.min(data, (d) => { return d.date; }),
        d3.max(data, (d) => { return d.date; })
      ])
      .range([pad, w-pad]);

    let yScale = d3.scaleLinear()
      .domain([
        d3.min(data, (d) => { return d.amount; }),
        d3.max(data, (d) => { return d.amount; })
      ])
      .range([h-(2*pad), pad]);
    
    let rScale = d3.scaleSqrt()
      .domain([
      d3.min(data, (d) => {return d.amount; }),
      d3.max(data, (d) => {return d.amount; })
    ])
    .range([2, 10]);
    
    // Axes
    let xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(5) // d3 figures out clean ticks
      .tickFormat(formatAsPercentage);
    // Specify ticks manually w/ tickValues([v1, v2, v3, v4, v5]);
    let yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(5)
      .tickFormat(formatAsPercentage);

    // Body
    let svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    
    // Add text to data
    svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => {
        return formatTime(d.date);
      })
      .attr("x", (d) => {
        return xScale(d.date) + 4;
      })
      .attr("y", (d) => {
        return yScale(d.amount) + 4;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "#bbb");

    // Circles
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        return xScale(d.date);
      })
      .attr("cy", (d) => {
        return yScale(d.amount);
      })
      .attr("r", (d) => {
        return rScale(d.amount);
      });
    
    // Axes
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + (h-2*pad) + ")")
      .call(xAxis);
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + pad + ",0)")
      .call(yAxis);

  });

