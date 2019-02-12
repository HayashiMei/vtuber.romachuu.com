let svg = null,
  channelData = [];

const createBubbleChart = channels => {
  var width = document.body.offsetWidth,
    height = document.body.offsetHeight;

  svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  svg
    .append("defs")
    .selectAll(".flag")
    .data(channels)
    .enter()
    .append("pattern")
    .attr("id", d => d.id)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("patternContentUnits", "objectBoundingBox")
    .append("image")
    .attr("width", 1)
    .attr("height", 1)
    .attr("preserveAspectRatio", "xMidYMid slice")
    .attr("xlink:href", d => d.thumbnail);

  const pack = data =>
    d3
      .pack()
      .size([width - 2, height - 2])
      .padding(3)(
      d3.hierarchy({ children: data }).sum(d => +d.subscriberCount)
    );

  const root = pack(channels);

  const leaf = svg
    .selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

  leaf
    .append("circle")
    .attr("r", d => d.r)
    .attr("fill", d => `url(#${d.data.id})`);
};

d3.json("data.json").then(data => {
  channelData = data;
  createBubbleChart(channelData);
});

window.addEventListener("resize", () => {
  if (svg) {
    svg.remove();
  }
  createBubbleChart(channelData);
});
