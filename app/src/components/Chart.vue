<template>
  <div class="chart" id="chart">
    <div class="tooltip">
      <div class="channel-name">{{ channelName }}</div>
      <div class="tooltip__rule"></div>
      <!-- <div class="user-name">{{ userName }}</div> -->
      <div class="subscriber-count">{{ subscriberCount }}</div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
// import data from './data.json';

export default {
  data: () => ({
    svg: null,
    channelData: [],
    tooltip: null,
    channelName: 'ひなたチャンネル (Hinata Channel)',
    userName: '猫宮ひなた',
    subscriberCount: '460,000',
  }),
  computed: {},
  mounted() {
    d3.json('data.json').then(data => {
      this.channelData.push(...data);
      this.createChart();
    });

    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      if (this.svg) {
        this.svg.remove();
      }
      this.createChart();
    },
    createChart() {
      const width = document.body.offsetWidth,
        height = document.body.offsetHeight;

      this.tooltip = d3.select('.tooltip');

      this.svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%');

      this.svg
        .append('defs')
        .selectAll('.flag')
        .data(this.channelData)
        .enter()
        .append('pattern')
        .attr('id', d => d.id)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('patternContentUnits', 'objectBoundingBox')
        .append('image')
        .attr('width', 1)
        .attr('height', 1)
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .attr('xlink:href', d => d.thumbnail);

      const root = d3
        .pack()
        .size([width - 2, height - 2])
        .padding(3)(d3.hierarchy({ children: this.channelData }).sum(d => d.subscriberCount));

      const leaf = this.svg
        .selectAll('g')
        .data(root.leaves())
        .join('g')
        .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`)
        .on('mouseover', this.handleMouseOver)
        .on('mouseout', this.handleMouseOut);

      leaf
        .append('circle')
        .attr('r', d => d.r)
        .attr('fill', d => `url(#${d.data.id})`)
        .style('cursor', 'pointer');
    },
    handleMouseOver(d) {
      this.channelName = d.data.title;
      this.subscriberCount = d3.format(',')(d.data.subscriberCount);

      let distY = d.y - d.r - 80;

      if (distY <= 5) {
        distY = d.y + d.r + 3;
      }

      let distX = Math.min(Math.max(d.x - 115, 5), document.body.offsetWidth - 230 - 5);

      this.tooltip
        .transition()
        .duration(200)
        .style('opacity', 1);
      this.tooltip.style('transform', `translate(${distX}px, ${distY}px)`);
    },
    handleMouseOut(d) {
      this.tooltip
        .transition()
        .duration(500)
        .style('opacity', 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.tooltip {
  position: absolute;
  width: 230px;
  padding: 10px;
  border: 1px solid rgba(200, 200, 200, 0.85);
  border-radius: 8px;
  font-size: 12px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 5px;
  opacity: 0;
  transition: transform 500ms ease 0s;
  pointer-events: none;
}

.channel-name {
  color: #333;
}

.tooltip__rule {
  height: 1px;
  margin: 1px auto 3px;
  background: #ddd;
  width: 130px;
}
</style>
