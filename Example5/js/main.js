const margin = { left: 100, right: 10, top: 10, bottom: 100 };
const frameWidth = 600;
const frameHeight = 400;
const width = frameWidth - margin.left - margin.right;
const boxHeight = frameHeight - margin.top - margin.bottom - 20;

const svg = d3.select("#chart-area")
  .append("svg")
    .attr("width", frameWidth)
    .attr("height", frameHeight);

const g = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// x axis label
const labelYOffset = boxHeight + 100;
g.append("text")
  .attr("class", "x-axis-label")
  .attr("x", width/2)
  .attr("y", labelYOffset)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("The World's Most Populated Cities");

// y axis label
g.append("text")
  .attr("class", "y-axis-label")
  .attr("transform", "rotate(-90)") //when you rotate this way, x and y axes also rotates. Thus, like below for x and y values.
  .attr("y", -60)
  .attr("x", -(boxHeight/2))
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Population");

d3.json("data/most_populated_cities.json").then(data => {
  data.forEach(d => d.value = +d.value); // Converting age values to integers
  console.log(data);

  // Scaling of x axis
  const x = d3.scaleBand()
    .domain(data.map(d=>d.name))  //need to provide an array of string
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  // Scaling of y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]) //d3.max will respond with the highest value of 'value' in this example.
    .range([boxHeight, 0]); // scaling range for y-axis must be upside down. lowest value = max boxHeight. vice versa.

  // Settting Axises
  // x-axis
  const xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${boxHeight})`)
    .call(xAxisCall)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", -5)
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-40)");

  // y-axis
  const yAxisCall = d3.axisLeft(y)
    .ticks(3)  // specify the number of ticks in the axis.
    .tickFormat(d => `${d}m`);  // add additional text to each tick.

  g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);

  // *1: pass the 'y' scale function defined above to make it scale to the range.
  // *2: pass the 'y' scale function defined above to make it scale to the range.
  // *3: as 'y' scale function swaps the height of the bar and the remaining space in the boxHeight, height should be now the remaining space.
  const rects = g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", d => y(d.value))
    .attr("x", d => x(d.name))
    .attr('width', x.bandwidth)
    .attr("height", (d) => boxHeight - y(d.value)) // *2 *3
    .attr("fill", ({name}) => {
      if(name === "Tokyo") return "blue";
      return "grey";
    });
}).catch(err => console.log(err));