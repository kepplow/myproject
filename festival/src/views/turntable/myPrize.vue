<template>
  <div class="my-prize">
    <div class="header-bg">
      <div class="header">我的奖品</div>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item, index) in prizeList" :key="index">
          <div class="item">
            <b-img :src="item.image"></b-img>
            <div class="item-info">{{item.name}}</div>
            <b-button>使用</b-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "myPrize",
  data() {
    return {
      prizeList: []
    };
  },
  mounted () {
    this.$axios({
      methed: 'get',
      url: 'api/activity/userinfo/myprize'
    }).then(res => {
      if (res.data.code == '1000') {
        this.prizeList = [...res.data.data]
      }
    })
  }
};
</script>

<style lang="less" scoped>
.my-prize {
  background-color: #7329fe;
  .header-bg {
    width: 100%;
    height: 176px;
    background: url(../../assets/images/prize-bg.png) no-repeat;
    background-size: 100% 100%;
    .header {
      display: inline-block;
      width: 200px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 24px;
      color: #7329fe;
      border-radius: 20px;
      background-color: #ffc942;
      margin: 68px auto;
      box-shadow: 0 0 5px 0 #ffc942;
    }
  }
  .content {
    margin-top: 70px;
    padding: 10px;
    ul {
      list-style: none;
      border: 3px solid #fff;
      padding: 10px;
      li {
        background-color: #ffc942;
        border-radius: 5px;
        margin: 15px 0;
        .item {
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 50px;
            height: 70px;
            background: url(../../assets/images/no-prize-pic.png) no-repeat;
            background-size: 100% 100%;
          }
          .item-info {
            color: #000;
            font-size: 18px;
            max-width: 200px;
          }
          button {
            width: 50px;
            height: 20px;
            padding: 0;
            font-size: 12px;
            color: #7329FE;
            background-color: #fff;
            box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.5),
              0px 2px 3px 0px rgba(0, 0, 0, 0.5);
            border-radius: 3px;
          }
        }
      }
    }
  }
}
</style>