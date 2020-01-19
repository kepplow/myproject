<template>
  <div class="my-coupon">
    <div class="title">我的优惠券</div>
    <ul>
      <li v-for="(item, index) in coupons" :key="index">
        <div class="left">
          <div>{{parseInt(item.money)}}元</div>
          <div>{{item.name}}</div>
        </div>
        <div class="center">
          <div>{{item.title}}</div>
          <div>有效期：{{item.starttime.split(' ')[0].replace(/-/g, '.') + '-' + item.endtime.split(' ')[0].replace(/-/g, '.')}}</div>
        </div>
        <div class="right" @click="$router.push(`/goodsDetails?type=1&id=${item.id}`)">立即<br>使用</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "myCoupon",
  data() {
    return {
      coupons: []
    };
  },
  methods: {
    init () {
      this.$axios({
        url: '/api/activity/userinfo/coupons',
        method: 'post',
      }).then(res => {
        if (res.data.code == '1000') {
          let data = res.data.data;
          this.coupons = data;
        }
      })
    }
  },
  mounted () {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.my-coupon {
  min-height: 100%;
  background-color: #7329fe;
  padding: 15px;
  .title {
    width: 250px;
    height: 50px;
    line-height: 50px;
    margin: 35px auto;
    background: linear-gradient(
      0deg,
      rgba(215, 215, 215, 1),
      rgba(255, 255, 255, 1)
    );
    color: #7329fe;
    font-size: 24px;
    font-weight: bold;
    box-shadow: 0 0 10px -1px rgba(255, 255, 255, 1);
  }
  ul {
    display: block;
    padding: 26px 0;
    list-style: none;
    background: linear-gradient(
      180deg,
      rgba(255, 201, 66, 1),
      rgba(255, 236, 188, 1)
    );
    border-radius: 10px;
    li {
      width: 285px;
      height: 85px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      margin: 24px auto;
      background: url(../../assets/images/coupon-bg@2x.png) no-repeat;
      background-size: 100% 100%;
      .left {
        color: #FF4701;
        font-size: 15px;
        border-right: 1px solid #808080;
        padding-right: 10px;
        div:nth-of-type(1) {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .center {
        padding-left: 5px;
        flex: 1;
        color: #FFC942;
        font-size: 12px;
        text-align: left;
        div:nth-of-type(1) {
          font-size: 15px;
        }
        div:nth-of-type(2) {
          font-size: 13px;
        }
      }
      .right {
        color: #fff;
        font-size: 18px;
      }
    }
  }
}
</style>