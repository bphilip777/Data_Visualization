let w = 600;
let h = 250;

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
  .domain([0, d3.max(dataset, d =>  d.value )])
  .range([0, h]);

//Define key function, to be used when binding data
let key = d => d.key;

// Paragraphs
let p1 = d3.select("body")
  .append("p")
  .attr("id", "add")
  .text("Click to add data.");

let p2 = d3.select("body")
  .append("p")
  .attr("id", "sub")
  .text("Click to remove data.");

//Create SVG element
let svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

let p3 = d3.select("body")
  .append("p")
  .attr("id", "wild")
  .text("Wild p!");

//Create bars
svg.selectAll("rect")
  .data(dataset, key)
  .enter()
  .append("rect")
  .attr("x", (d,i) => xScale(i) )
  .attr("y", d => h - yScale(d.value))
  .attr("width", xScale.bandwidth())
  .attr("height", d => yScale(d.value))
  .attr("fill", d => "rgb(0, 0, " + (d.value * 10) + ")" );
  // .on("mouseover", d => "rgb(0, 0, "+ (d.value*10)+10 +")")
  // .on("mouseout", d => "rgb(0,0,"+ (d.value*10) +")");

//Create labels
svg.selectAll("text")
  .data(dataset, key)
  .enter()
  .append("text")
  .text(d => d.value)
  .attr("text-anchor", "middle")
  .attr("x", (d,i) => xScale(i) + xScale.bandwidth() / 2)
  .attr("y", d => h - yScale(d.value) + 14 )
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "white");

// Highlight bars
d3.selectAll("rect")
  .on("mouseover", function(d) { 
    let rec = d3.select(this);
    let col = rec.attr("fill").split(",");
    col = col[2].split(")");
    col = parseInt(col[0]);
    col = col + 10 > 255 ? col : col + 10;
    rec.attr("fill", "rgb(35, 35, "+ col +")");
  })
  .on("mouseout", function(d) { 
    let rec = d3.select(this);
    let col = rec.attr("fill").split(",");
    col = col[2].split(")");
    col = parseInt(col[0]);
    col = col - 10 < 0 ? col : col - 10;
    rec.attr("fill", "rgb(0, 0, "+ col +")");
  });

// Add + remove data/label/bar
d3.selectAll("p")
  .on("click", function(d) {
    let pId = d3.select(this).attr("id");

    console.log(pId); 
    if (pId == "add") {
      console.log("Adding data..");
      let minValue = 2;
      let maxValue = 25 - minValue;
      let newNumber = Math.floor(Math.random() * maxValue) + minValue;
      let lastKeyValue = dataset[dataset.length - 1].key;
      dataset.push({
        key: lastKeyValue + 1,
        value: newNumber,
      });
    } else if(pId == "sub") {
      console.log("Removing data..");
      // Remove value
      dataset.shift();
    } else {
      console.log("Wild p found!!!!");
    }
    
    xScale.domain(d3.range(dataset.length));
    yScale.domain([0, d3.max(dataset, d => d.value )]);

    let bars = svg.selectAll("rect")
      .data(dataset, key);

    bars.enter()
      .append("rect")
      .attr("x", w)
      .attr("y", d => h - yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.value))
      .attr("fill", d => "rgb(0,0,"+ (d.value*10) +")")
      .merge(bars)
      .transition()
      .duration(500)
      .attr("x", (d,i) => xScale(i))
      .attr("y", d => h-yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => yScale(d.value));
    
    bars.exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.bandwidth())
      .remove();
    
    let labels = svg.selectAll("text")
      .data(dataset, key);

    labels.enter()
      .append("text")
      .text(d => d.value)
      .attr("text-anchor", "middle")
      .attr("x", w)
      .attr('y', d=> h-yScale(d.value)+14)
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "white")
      .merge(labels)	//Update…
      .transition()
      .duration(500)
      .attr("x", (d,i) => xScale(i) + xScale.bandwidth() / 2 );

    //Exit
    labels.exit()
      .transition()
      .duration(500)
      .attr("x", -xScale.bandwidth())
      .remove();
});
