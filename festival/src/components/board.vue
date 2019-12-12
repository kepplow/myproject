<template>
  <div class="board">
    <div class="title">{{config.header}}</div>
    <p>{{config.content}}</p>
  </div>
</template>

<script>
export default {
  name: "board",
  data() {
    return {};
  },
  props: ["config"]
};
</script>

<style lang="less" scoped>
.board {
  width: 100%;
  border: 5px solid #ffc942;
  border-radius: 10px;
  background-color: #fff;
  .title {
    width: 286px;
    height: 84px;
    background: url(../assets/images/board-title@2x.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: -40px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    padding-top: 10px;
  }
  p {
    text-align: left;
    font-size: 15px;
    color: #7329fe;
    padding: 0 1em;
  }
}
</style>