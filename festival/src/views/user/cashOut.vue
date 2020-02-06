<template>
  <div class="cashOut">
    <div class="header">
      <div class="tip">提现</div>
      <div class="target-item">
        <span class="icon"></span>
        <span class="text">我的零钱</span>
      </div>
    </div>
    <div class="content">
      <div class="form">
        <p>
          <span>提现金额</span>
          <input
            type="number"
            v-model.number="count"
            @change="count = new Number(count).toFixed(2)"
          />
        </p>
        <p>
          <span>提现手续费</span>
          <input type="number" :value="service" readonly />
        </p>
        <p>
          <span>到账金额</span>
          <input type="number" :value="actual" readonly />
        </p>
      </div>
      <p class="arrival-time">
        预计
        <span>2小时内</span>到账
      </p>
      <div class="tip">
        <div v-show="canOut" class="balance">
          当前零钱余额
          <span>{{all}}</span>元，
          <span class="allCash" @click="count = all.toFixed(2)">全部提现</span>
        </div>
        <div v-show="!canOut">输入金额超过收益余额</div>
      </div>
      <div class="submit" @click="cashOut">提现</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cashOut",
  data() {
    return {
      all: 6000.0,
      count: 0
    };
  },
  computed: {
    // 服务费
    service() {
      return (this.count / 500).toFixed(2);
    },
    // 到账金额
    actual() {
      return (this.count - (this.count / 500).toFixed(2)).toFixed(2);
    },
    // 能否提现
    canOut() {
      return this.count > this.all ? false : true;
    }
  },
  methods: {
    // 发送提现请求
    cashOut() {
      this.$axios({
        url: "/api/activity/userinfo/apply",
        method: "post",
        data: {
          money: this.count
        }
      }).then(res => {
        // console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.cashOut {
  height: 100%;
  color: #000;
  background-color: #f2f2f2;
  .header {
    height: 75px;
    display: flex;
    justify-items: start;
    padding: 20px;
    align-items: center;
    .tip {
      margin-right: 20px;
      color: #000;
      font-size: 12px;
    }
    .icon {
      display: inline-block;
      width: 25px;
      height: 25px;
      background: url(../../assets/images/my-balance.png) no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
      margin-right: 6px;
    }
    .text {
      font-size: 12px;
    }
  }
  .content {
    background-color: #fff;
    padding: 10px 20px;
    .form {
      margin-top: 20px;
      p {
        display: flex;
        border-bottom: 1px solid #80808088;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 12px;
        }
        input {
          display: inline-block;
          text-align: right;
          border: none;
          font-size: 15px;
          font-weight: bold;
        }
        input:focus {
          outline: none;
        }
      }
    }
    .arrival-time {
      color: #808080;
      text-align: right;
      font-size: 14px;
      margin-top: -10px;
      span {
        color: #ffc942;
      }
    }
    .tip {
      text-align: left;
      color: #f00;
      font-size: 12px;
      .balance {
        color: #808080;
        .allCash {
          color: blue;
        }
      }
    }
    .submit {
      margin-top: 40px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      background: linear-gradient(
        90deg,
        rgba(251, 199, 127, 1),
        rgba(255, 149, 3, 1)
      );
      border-radius: 5px;
    }
  }
}
</style>