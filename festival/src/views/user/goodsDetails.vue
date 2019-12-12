<template>
  <div class="goods-details">
    <div class="business">商家</div>
    <div class="content">
      <div class="title">活动全场满5减三</div>
      <div class="time">2019年11月22日 13:10</div>
      <div class="number">
        序列号:
        <span>123456</span>
      </div>
      <div class="QR-code">
        <img src="../../assets/images/codeImg.png"/>
      </div>
      <div class="explain">
        说明:
        <div class="explain-detailes">哈哈哈哈啊哈哈哈哈</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsDetails",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.goods-details {
  background-color: #f2f2f2;
  padding: 0 10px;
  min-height: 100%;
  .business {
    color: rgba(0, 0, 0, 0.7);
    height: 43px;
    line-height: 43px;
    border-bottom: 1px solid #808080;
    text-align: left;
    padding-left: 10px;
    font-size: 14px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .content {
    background-color: #fff;
    padding: 10px;
    text-align: left;
    font-size: 15px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .title {
      color: #000;
    }
    .time {
      color: #ff4701;
    }
    .number {
        color: #808080;
        width: 200px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: rgba(128,128,128,.3);
        margin: 20px auto;
        span {
            color: #808080;
            font-size: 24px;
            vertical-align: middle;
        }
    }
    .QR-code {
        width: 250px;
        height: 250px;
        line-height: 250px;
        border:1px solid rgba(128,128,128,1);
        text-align: center;
        margin: 0 auto;
        img {
            width: 200px;
            height: 200px;
        }
    }
    .explain {
        margin-top: 30px;
        font-size: 15px;
        color: #000;
        .explain-detailes {
            padding: 0 40px;
            color: #808080;
            font-size: 14px;
        }
    }
  }
}
</style>