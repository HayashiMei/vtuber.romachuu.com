<template>
  <div class="app">
    <div class="update-time">{{ '> 更新日時 ' + formatUpdateTime }}</div>
    <div class="tooltip">
      <div class="channel-name">{{ channelName }}</div>
      <div class="tooltip__rule"></div>
      <div class="subscriber-count">登録数：{{ subscriberCount }}</div>
      <div class="view-count">再生数：{{ viewCount }}</div>
    </div>
    <transition name="fade">
      <loading v-if="showLoad" :percentage="percentage"/>
    </transition>
  </div>
</template>

<script>
import * as d3 from 'd3';
import Loading from './components/Loading.vue';
// import data from './data.json';

export default {
  components: {
    Loading,
  },
  data: () => ({
    updateTime: '',
    svg: null,
    leaf: null,
    channelData: [],
    tooltip: null,
    channelName: '',
    subscriberCount: '',
    viewCount: '',
    loadCount: 0,
    showLoad: true,
  }),
  computed: {
    formatUpdateTime() {
      if (!this.updateTime) {
        return '';
      }

      const year = this.updateTime.getFullYear();
      const month = this.padStart(this.updateTime.getMonth() + 1);
      const day = this.padStart(this.updateTime.getDate());
      const h = this.padStart(this.updateTime.getHours());
      const m = this.padStart(this.updateTime.getMinutes());
      return `${year}/${month}/${day} ${h}:${m}`;
    },
    percentage() {
      if (!Array.isArray(this.channelData)) {
        return 0;
      }
      return (this.loadCount / this.channelData.length) * 100;
    },
  },
  watch: {
    loadCount(to) {
      if (!Array.isArray(this.channelData)) {
        return;
      }

      if (to === this.channelData.length) {
        this.createChart();

        setTimeout(() => {
          this.showLoad = false;
        }, 2000);
      }
    },
  },
  mounted() {
    d3.json('data.json').then(data => {
      this.channelData.push(...data.channels);
      this.updateTime = new Date(data.updateTime);
      this.loadImage();
    });

    window.addEventListener('resize', this.renderCircle);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.renderCircle);
  },
  methods: {
    padStart(str) {
      return String(str).padStart(2, '0');
    },
    createChart() {
      this.tooltip = d3.select('.tooltip');

      this.svg = d3
        .select('.app')
        .append('svg')
        .attr('width', '100%')
        .attr('height', 'calc(100% - 50px)');

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

      this.renderCircle();
    },
    renderCircle() {
      const width = document.body.offsetWidth,
        height = document.body.offsetHeight - 50;

      const root = d3
        .pack()
        .size([width - 2, height - 2])
        .padding(3)(d3.hierarchy({ children: this.channelData }).sum(d => d.subscriberCount));

      if (this.leaf) {
        this.leaf.data(root.leaves()).attr('transform', d => `translate(${d.x + 1},${d.y + 1})`);
        this.leaf.select('circle').attr('r', d => d.r);
        return;
      }

      this.leaf = this.svg
        .selectAll('g')
        .data(root.leaves())
        .join('g')
        .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`)
        .on('mouseover', this.handleMouseOver)
        .on('mouseout', this.handleMouseOut)
        .on('click', this.handleClick);

      this.leaf
        .append('circle')
        .attr('r', d => d.r)
        .attr('fill', d => `url(#${d.data.id})`)
        .style('cursor', 'pointer');
    },
    handleMouseOver(d) {
      this.channelName = d.data.title;
      this.subscriberCount = d3.format(',')(d.data.subscriberCount);
      this.viewCount = d3.format(',')(d.data.viewCount);

      let distY = d.y - d.r - 83;

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
    handleClick(d) {
      window.open(`https://www.youtube.com/channel/${d.data.id}`);
    },
    loadImage() {
      for (const c of this.channelData) {
        const image = new Image();
        image.src = c.thumbnail;
        image.onload = () => {
          this.loadCount++;
        };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  height: 100%;
  width: 100%;
  background-color: #333;
  overflow: hidden;
}

.update-time {
  padding: 10px;
  color: white;
  font-size: 30px;
  line-height: 1;
}

.tooltip {
  position: absolute;
  width: 230px;
  padding: 10px;
  border: 1px solid rgba(200, 200, 200, 0.85);
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 5px;
  opacity: 0;
  transition: transform 500ms ease 0s;
  pointer-events: none;
}

.channel-name {
  color: #333;
  font-weight: bold;
}

.tooltip__rule {
  height: 1px;
  width: 100%;
  margin: 5px 0;
  background-color: #ddd;
}

.subscriber-count {
  margin-bottom: 3px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
