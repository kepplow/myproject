<template>
  <div class="red-packets">
    <div class="box">
      <span>{{number}}s</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "redPackets",
  data() {
    return {
      number: 0,
      timeId: null
    };
  },
  props: ["config"],
  mounted() {
    this.$nextTick(() => {
      this.number = this.config.countStop;
      this.timeId = setInterval(() => {
        this.number--;
        if (this.number <= 0) {
          clearInterval(this.timeId);
          this.$emit("done");
        }
      }, 1000);
    });
  },
  beforeDestroy() {
    // 清除定时器
    clearInterval(this.timeId);
    this.timeId = null;
  }
};
</script>

<style lang="less" scoped>
.red-packets {
  position: fixed;
  top: 100px;
  left: -15px;
  z-index: 201;
  .box {
    width: 120px;
    height: 100px;
    background: url(../assets/images/red-packets.gif);
    background-size: 100% 100%;
    span {
      color: #fb9f20;
      height: 80px;
      line-height: 80px;
      font-size: 14px;
    }
  }
}
</style>