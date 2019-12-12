<template>
  <div class="text-tip">
    <div class="title">{{config.title}}</div>
    <div class="content" v-html="config.content"></div>
  </div>
</template>

<script>
export default {
  name: "textTip",
  data() {
    return {};
  },
  props: ['config']
};
</script>

<style lang="less" scoped>
.text-tip {
  position: relative;
  background-color: #fff;
  padding-top: 10px;
  .title {
    position: relative;
    display: inline-block;
    margin: 0 auto 14px;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    padding: 2px 18px;
    background-color: #fb9f20;
    border-radius: 5px;
    box-shadow: 1px 2px 2px rgba(251, 159, 32, 0.3);
  }
  .title:before {
    position: absolute;
    left: calc(100% + 10px);
    top: 12px;
    content: "";
    width: 180px;
    height: 14px;
    background: url(../../../assets/images/right-tip.png);
    background-size: 100% 100%;
  }
  .title:after {
    position: absolute;
    right: calc(100% + 10px);
    content: "";
    width: 180px;
    height: 14px;
    background: url(../../../assets/images/left-tip.png);
    background-size: 100% 100%;
  }
  .content {
    padding: 10px;
    text-align: left;
  }
}
</style>