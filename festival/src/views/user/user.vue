<template>
  <div class="user">
    <div class="info">
      <div class="pic-box">
        <div :style="`background-image: url(${headimgurl})` "></div>
      </div>
      <div class="name">{{nickname}}</div>
      <div class="uid">
        UID:
        <span>22222</span>
      </div>
    </div>
    <div class="chunks">
      <ul>
        <li @click="$router.push('/cashOutList')">
          <div class="left">
            <span class="icon"></span>
            <span>我的提现</span>
          </div>
          <div class="right">
            <span>提现入口</span>
            <span class="icon iconfont">&#xe62c;</span>
          </div>
        </li>
        <li @click="$router.push('/turntable')">
          <div class="left">
            <span class="icon"></span>
            <span>参与活动</span>
          </div>
          <div class="right">
            <span class="icon iconfont">&#xe62c;</span>
          </div>
        </li>
        <li @click="$router.push('/fans')">
          <div class="left">
            <span class="icon"></span>
            <span>粉丝拓展</span>
          </div>
          <div class="right">
            <span class="icon iconfont">&#xe62c;</span>
          </div>
        </li>
        <li @click="$router.push('/myOrder')">
          <div class="left">
            <span class="icon"></span>
            <span>我的订单</span>
          </div>
          <div class="right">
            <span class="icon iconfont">&#xe62c;</span>
          </div>
        </li>
        <li @click="$router.push('/myCoupon')">
          <div class="left">
            <span class="icon"></span>
            <span>我的优惠券</span>
          </div>
          <div class="right">
            <span class="icon iconfont">&#xe62c;</span>
          </div>
        </li>
        <li @click="$router.push('/orderExpansion')">
          <div class="left">
            <span class="icon"></span>
            <span>订单拓展</span>
          </div>
          <div class="right">
            <span class="icon iconfont">&#xe62c;</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
require("../../assets/fonts/iconfont.css");
export default {
  name: "user",
  data() {
    return {
      headimgurl: '',
      nickname: '游客'
    };
  },
  beforeMount() {
    this.$axios({
      method: "POST",
      url: `/api/activity/userinfo/user`
    }).then(res => {
      console.log(res)
      let tmpData = res.data
      if (tmpData.code == 1000 && tmpData.data) {
        this.headimgurl = tmpData.data.avatar
        this.nickname = tmpData.data.nickname
      } else {
        this.$bvModal.msgBoxOk(res.msg, {
            title: '提示！',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'success',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
        })
      }
    });
  }
};
</script>

<style lang="less" scoped>
.user {
  .info {
    display: inline-block;
    width: 100%;
    height: 170px;
    background-color: #7329fe;
    padding: 0;
    margin: 0;
    font-size: 12px;
    color: #fff;
    .pic-box {
      width: 80px;
      height: 80px;
      padding: 6px;
      border: 1px solid #fff;
      border-radius: 50%;
      margin: 25px auto 10px auto;
      div {
        background-size: 100%;
      }
      div {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #fff;
      }
    }
  }
  .chunks {
    background-color: #fff;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        display: flex;
        padding: 0 10px;
        color: #000;
        justify-content: space-between;
        border-bottom: 1px solid #808080;
        .left {
          .icon {
            display: inline-block;
            width: 24px;
            height: 24px;
            vertical-align: middle;
            background-size: 100%;
            margin-right: 5px;
          }
        }
      }
      .right {
        color: #808080;
        margin-right: 15px;
        .icon {
          font-size: 18px;
          vertical-align: top;
        }
      }
      li:nth-of-type(1) .left .icon {
        background-image: url(../../assets/images/wode@2x.png);
      }
      li:nth-of-type(2) .left .icon {
        background-image: url(../../assets/images/huodong@2x.png);
      }
      li:nth-of-type(3) .left .icon {
        background-image: url(../../assets/images/fensi@2x.png);
      }
      li:nth-of-type(4) .left .icon {
        background-image: url(../../assets/images/wodedingdan2@2x.png);
      }
      li:nth-of-type(5) .left .icon {
        background-image: url(../../assets/images/wodeyouhuiquan@2x.png);
      }
      li:nth-of-type(6) .left .icon {
        background-image: url(../../assets/images/dingdan@2x.png);
      }
    }
  }
}
</style>