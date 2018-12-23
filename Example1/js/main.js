const svg = d3.select("#chart-area").append("svg")
  .attr("width", 800)
  .attr("height", 800);

const circle = svg.append("circle")
  .attr("cx", 80)
  .attr("cy", 100)
  .attr("r", 50)
  .attr("fill", "blue");

const rectangle = svg.append("rect")
  .attr("x", 100)
  .attr("y", 200)
  .attr("width", 250)
  .attr("height", 80)
  .attr("fill", "green");