<template>
  <div class="app">
    <chart/>
    <div class="update-time">{{ '> ' + updateTime }}</div>
  </div>
</template>

<script>
import Chart from './components/Chart.vue';

export default {
  components: {
    Chart,
  },
  data: () => ({
    updateTime: '2019/02/13',
  }),
  computed: {},
  created() {},
  methods: {},
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
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px;
  color: white;
  font-size: 30px;
  line-height: 1;
}
</style>
