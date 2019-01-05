const data = [25, 20, 10, 12, 15];

const svg = d3.select("#chart-area")
  .append("svg")
    .attr("width", 400)
    .attr("height", 400);

d3.json("data/buildings.json").then(data => {
  data.forEach(d => d.height = +d.height); // Converting age values to integers
  console.log(data);

  // Scaling of x axis
  const x = d3.scaleBand()
    .domain(data.map(d=>d.name))
    .range([0, 400])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  // Scaling of y axis
  const y = d3.scaleLinear()
    .domain([0, 828])
    .range([0, 400]);

  const rects = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", 20)
    .attr("x", d => x(d.name))
    .attr('width', x.bandwidth)
    .attr("height", (d) => y(d.height)) //pass the scale function defined above to make it scale to the range.
    .attr("fill", ({ name}) => {
      if(name === "Shanghai Tower") return "blue";
      return "grey";
    });
}).catch(err => console.log(err));