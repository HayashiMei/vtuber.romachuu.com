<template>
  <div class="loading">
    <div class="loading__bar">
      <div class="loading__bar__line"></div>
      <div class="loading__bar__line"></div>
      <div class="loading__bar__line"></div>
      <div class="loading__bar__line"></div>
      <div class="loading__bar__mainline">
        <div :style="computedStyles"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    computedStyles() {
      return {
        transform: `translateX(${-100 + this.percentage}%)`,
      };
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;

  .loading__bar {
    position: relative;
    width: calc(100% - 100px);
    height: 100px;

    .loading__bar__line {
      position: absolute;
      right: 0;
      width: 100%;
      overflow: hidden;

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        transform: translate(-100%);
        background-color: #ccc;
        opacity: 0.4;
      }

      &:nth-child(1) {
        top: 10px;
        height: 4px;

        &::after {
          animation: load-view__progressbar-line 1.5s ease 0s infinite;
        }
      }

      &:nth-child(2) {
        top: 30px;
        height: 2px;

        &::after {
          animation: load-view__progressbar-line 3s ease 1.5s infinite;
        }
      }

      &:nth-child(3) {
        bottom: 25px;
        height: 6px;

        &::after {
          animation: load-view__progressbar-line 5s ease 0.5s infinite;
        }
      }

      &:nth-child(4) {
        bottom: 10px;
        height: 3px;

        &::after {
          animation: load-view__progressbar-line 2s ease 1s infinite;
        }
      }
    }

    .loading__bar__mainline {
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -4px;
      width: 100%;
      height: 8px;
      overflow: hidden;

      div {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background-color: #999;
        transition: all 0.5s ease 0s;
      }
    }
  }
}

@keyframes load-view__progressbar-line {
  0% {
    transform: translate(-100%);
    width: 100%;
  }
  30% {
    transform: translate(0%);
    width: 100%;
  }
  60% {
    transform: translate(0%);
    width: 0;
  }
  100% {
    transform: translate(0%);
    width: 0;
  }
}
</style>
