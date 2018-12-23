const data = [25, 20, 10, 12, 15];

const svg = d3.select("#chart-area").append("svg")
  .attr("width", 400)
  .attr("height", 400);

const circles = svg.selectAll("circle")
  .data(data);

circles.enter()
  .append("circle")
    .attr("cx", (d, i) => ((i*50) + 25 ))
    .attr("cy", (d, i) => d+100 )
    .attr("r", (d, i) => d)
    .attr("fill", "red");
