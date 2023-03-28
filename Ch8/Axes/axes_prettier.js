let w = 500;
let h = 300;
let pad = 40;

let dataset, xScale, yScale, xAxis, yAxis;

let parseTime = d3.timeParse("%m/%d/%y");
let formatTime = d3.timeFormat("%e");

let rowConverter = function(d) {
  return {
    date: parseTime(d.Date),
    amount: parseInt(d.Amount),
  };
}

d3.csv("./time_scale.csv", rowConverter)
  .then(function(data) {
    dataset = data;

    let startDate = d3.min(dataset, (d) => { return d.date; });
    let endDate = d3.max(dataset, (d) => { return d.date; });

    xScale = d3.scaleTime()
      .domain([
        d3.timeDay.offset(startDate, -1), // -1 = pad
        d3.timeDay.offset(endDate, 1), // 1 = pad
      ])
      .range([pad, w-pad]);

    yScale = d3.scaleLinear()
      .domain([
        0,
        d3.max(dataset, (d) => { return d.amount; })
      ])
      .range([h-pad, pad]);

    // Axes
    xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(9)
      .tickFormat(formatTime);
    
    yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(10);

    // SVG
    let svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    // Guide lines
    svg.selectAll("line")
      .data(dataset)
      .enter()
      .append("line")
      .attr("x1", (d) => {
        return xScale(d.date);
      })
      .attr("x2", (d) => {
        return xScale(d.date);
      })
      .attr("y1", h-pad)
      .attr("y2", (d) => {
        return yScale(d.amount);
      })
      .attr("stroke", "#ddd")
      .attr("stroke-width", 1);

    // Circles
    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        return xScale(d.date);
      })
      .attr("cy", (d) => {
        return yScale(d.amount);
      })
      .attr("r", 2);

    // X-axis
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0, " + (h-pad) + ")")
      .call(xAxis);
    
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + pad + ",0)")
      .call(yAxis);
  });
