const data = [25, 20, 10, 12, 15];

d3.json("data/buildings.json").then(data => {
  data.forEach(d => d.height = +d.height); // Converting age values to integers
  console.log(data);
  const svg = d3.select("#chart-area").append("svg")
    .attr("width", 800)
    .attr("height", 800);

  const rectangles = svg.selectAll("rect")
    .data(data);

  rectangles.enter()
    .append("rect")
    .attr("x", (d, i) => ((i*80) + 50 ))
    .attr("y", () => 100 )
    .attr('width', 50)
    .attr("height", ({height}) => height)
    .attr("fill", ({ name}) => {
      if(name === "Shanghai Tower") return "blue";
      return "grey";
    });
}).catch(err => console.log(err));