<template>
  <div class="cashOutList">
    <div class="header-bg">
      <div class="yield">
        <div class="text">
          <span class="title">收益额</span>
          <span class="count">10000</span>
        </div>
        <span class="cash-out" @click="$router.push('/cashOut')">提现</span>
      </div>
      <div class="tab">
        <a :class="{'active': active}" @click="active = true">收益记录</a>
        <a :class="{'active': !active}" @click="active = false">提现记录</a>
      </div>
    </div>
    <div class="content">
      <ul v-show="active">
        <li>
          <div class="item">
            <b-img src="../../assets/images/red-packet.png"></b-img>
            <div class="explain">
              <div class="title">阅读奖励</div>
              <div class="time">20119.12.05 12:03</div>
            </div>
            <div class="money">+0.8</div>
          </div>
        </li>
        <li>
          <div class="item">
            <b-img src="../../assets/images/red-packet.png"></b-img>
            <div class="explain">
              <div class="title">阅读奖励</div>
              <div class="time">20119.12.05 12:03</div>
            </div>
            <div class="money">+0.8</div>
          </div>
        </li>
        <li>
          <div class="item">
            <b-img src="../../assets/images/red-packet.png"></b-img>
            <div class="explain">
              <div class="title">阅读奖励</div>
              <div class="time">20119.12.05 12:03</div>
            </div>
            <div class="money">+0.8</div>
          </div>
        </li>
      </ul>
      <ul v-show="!active">
        <li>
          <div class="item">
            <div class="explain">
              <div class="title">提现</div>
              <div class="time">20119.12.05 12:03</div>
            </div>
            <div class="money">5元</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="explain">
              <div class="title">提现</div>
              <div class="time">20119.12.05 12:03</div>
            </div>
            <div class="money">5元</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "cashOutList",
  data() {
    return {
      active: true
    };
  },
  mounted () {
  }
};
</script>

<style lang="less" scoped>
.cashOutList {
  height: 100%;
  background-color: #f2f2f2;
  .header-bg {
    width: 100%;
    height: 150px;
    background: linear-gradient(
      90deg,
      rgba(251, 199, 127, 1),
      rgba(255, 149, 3, 1)
    );
    .yield {
      position: relative;
      height: 106px;
      border-bottom: 1px solid #fff;
      padding-top: 25px;
      .text {
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        .title {
          font-size: 15px;
        }
        .count {
          font-size: 24px;
        }
      }
      .cash-out {
        position: absolute;
        top: 50px;
        right: 50px;
        display: inline-block;
        width: 50px;
        height: 20px;
        color: #ff980a;
        font-size: 14px;
        background-color: #fff;
        border-radius: 10px;
      }
    }
    .tab {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      height: 43px;
      color: #fff;
      font-size: 14px;
      a {
        text-decoration: none;
        color: #fff;
      }
      .active {
        padding-top: 12px;
        padding-bottom: 11px;
        color: #000;
        border-bottom: 1px solid #000;
      }
    }
  }
  .content {
    padding: 0 20px 40px 20px;
    background-color: #fff;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        height: 75px;
        border-bottom: 1px solid #808080;
        .item {
          display: flex;
          justify-content: space-between;
          padding-top: 30px;
          align-items: center;
          img {
            width: 16px;
            height: 24px;
            margin-right: 10px;
          }
          .explain {
            flex: 1;
            text-align: left;
            .title {
              color: black;
              font-size: 12px;
            }
            .time {
              color: #808080;
              font-size: 12px;
            }
          }
          .money {
            color: #FFC942;
            font-size: 18px;
          }
        }
      }
    }
    ul:nth-of-type(2) li .item .explain .title {
      font-weight: bold;
      font-size: 14px;
    }
    ul:nth-of-type(2) li .item .explain .time {
      font-size: 14px;
    }
  }
}
</style>