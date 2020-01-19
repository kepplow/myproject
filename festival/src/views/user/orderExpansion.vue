<template>
  <div class="order-expansion">
    <div class="head"></div>
    <ul class="list">
      <li v-for="(item, index) in orders" :key="index">
        <img :src="item.avatar" />
        <div class="details">
          <div class="name">{{item.uname}}</div>
          <div class="time">{{item.time}}</div>
        </div>
        <div class="money">返现{{item.remoney}}元</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "orderExpansion",
  data() {
    return {
      orders: []
    };
  },
  methods: {
    init () {
      this.$axios({
        url: '/api/activity/userinfo/reorders',
        method: 'post',
      }).then(res => {
        if (res.data.code == '1000') {
          let data = res.data.data;
          this.orders = data
        }
      })
    }
  },
  mounted () {
    this.init()
  }
};
</script>

<style lang="less" scoped>
.order-expansion {
  min-height: 100%;
  margin: 0;
  padding: 0;
  .head {
    width: 100%;
    height: 200px;
    background: url(../../assets/images/order-expansion-bg.png) no-repeat;
    background-size: cover;
  }
  ul.list {
    width: calc(100% - 40px);
    min-height: 200px;
    background: white;
    box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.24),
      0px 4px 10px 0px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    margin: 0 20px;
    margin-top: -125px;
    list-style: none;
    padding: 10px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28px 0;
      img {
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 5px;
        align-self: flex-start;
      }
      .details {
        text-align: left;
        flex: 1;
        color: #808080;
        font-size: 15px;
      }
      .money {
        color: #ff4701;
        font-size: 15px;
        margin-right: 10px;
      }
    }
  }
}
</style>