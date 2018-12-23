const data = [25, 20, 10, 12, 15];

d3.json("data/ages.json").then(data => {
    data.forEach(d => d.age = +d.age); // Converting age values to integers
    console.log(data);
  const svg = d3.select("#chart-area").append("svg")
    .attr("width", 800)
    .attr("height", 800);

  const circles = svg.selectAll("circle")
    .data(data);

  circles.enter()
    .append("circle")
    .attr("cx", (d, i) => ((i*150) + 50 ))
    .attr("cy", (d, i) => 100 )
    .attr("r", ({ name, age}, i) => age)
    .attr("fill", ({ name, age}) => {
      if(name === "Emily") return "blue";
      return "green";
    });
  }).catch(err => console.log(err));
