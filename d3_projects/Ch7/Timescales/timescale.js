let parseTime = d3.timeParse("%m/%d/%y"); // converts dates to u32
let formatTime = d3.timeFormat("%b %e"); // converts mo to nu

let rowConverter = function(d) {
  return {
    date: parseTime(d.Date),
    amount: parseInt(d.Amount),
  };
}

d3.csv("./time_scale_data.csv", rowConverter)
  .then(function(data) {
    console.log(data);
    let w = 500;
    let h = 300;
    let pad =40;

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
      .range([h-pad, pad]);

    let svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

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
      .attr("r", 2);
  });

