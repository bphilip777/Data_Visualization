// Basic props with margins
// let margin = {top: 50, right: 50, bottom: 50, left: 50},
let w = 800, h = 400, pad = 50;

// Initialize variables
let dataset, xScale, yScale; 
// let line, dangerLine;
let area, dangerArea, xAxis, yAxis;

// Convert dates to strings
let formatTime = d3.timeFormat("%Y");

let rowConverter = d => {
  return {
    date: new Date(+d.year, (+d.month - 1)),
    average: parseFloat(d.average)
  };
}

d3.csv("./refined_data.csv", rowConverter)
  .then(data => {

    // Scales
    xScale = d3.scaleTime()
      .domain([
        d3.min(data, d => d.date),
        d3.max(data, d => d.date)
      ])
      .range([pad, w]);

    yScale = d3.scaleLinear()
      .domain([
        d3.min(data, d=>d.average - pad), 
        d3.max(data, d=>d.average)])
      .range([h-pad, pad]);

    // Axes
    let xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(10)
      .tickFormat(formatTime);

    let yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(10);

    // Line generators
    // line = d3.line()
    //   .defined(d => d.average >= 0 && d.average <= 350)
    //   .x(d => xScale(d.date))
    //   .y(d => yScale(d.average));
    //
    // dangerLine = d3.line()
    //   .defined(d => d.average >= 350)
    //   .x(d => xScale(d.date))
    //   .y(d => yScale(d.average));
    
    // Area generators
    area = d3.area()
      .defined(d => d.average >= 0 && d.average <= 350)
      .x(d => xScale(d.date))
      .y0(() => yScale.range()[0])
      .y1(d => yScale(d.average));

    dangerArea = d3.area()
      .defined(d => d.average >= 350)
      .x(d => xScale(d.date))
      .y0(() => yScale(350))
      .y1(d => yScale(d.average));

    // SVG 
    let svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    
    svg.append("text")
      .attr("class", "dangerLabel")
      .attr("x", pad + 20)
      .attr("y", yScale(350)-7)
      .text("350 ppm 'safe' level");

    // Line/Area
    svg.append("path")
      .datum(data)
      // .attr("class", "line")
      // .attr("d", line);
      .attr("class", "area")
      .attr("d", area);

    svg.append("path")
      .datum(data)
      // .attr("class", "line danger")
      // .attr("d", dangerLine);
      .attr("class", "areaDanger")
      .attr("d", dangerArea);
    
    // Axes
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,"+ (h-pad) +")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + pad +", 0)")
      .call(yAxis);
      
    // Draw lines
    // Safe CO2 level line 
    svg.append("line")
      .attr("class", "line safeLevel")
      .attr("x1", pad)
      .attr("x2", w)
      .attr("y1", yScale(350))
      .attr("y2", yScale(350));

    svg.append("text")
      .attr("class", "dangerLabel")
      .attr("x", pad + 20)
      .attr("y", yScale(350)-7)
      .text("350 ppm 'safe' level");

  });
