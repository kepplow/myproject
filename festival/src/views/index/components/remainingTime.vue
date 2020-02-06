<template>
  <div class="remaining-time">
    <div class="time-down">
      <div>
        <span class="time-down-day">
          活动时间 据结束
          <span>{{timeDown.day}}</span>天
        </span>
      </div>
      <div class="h-m-s">
        <span>{{timeDown.hours}}</span> :
        <span>{{timeDown.minutes}}</span> :
        <span>{{timeDown.second}}</span>
      </div>
    </div>
    <b-progress class="progress">
      <b-progress-bar :value="Math.floor(this.config.pay/this.config.count * 100)"></b-progress-bar>
    </b-progress>
    <div class="count">
      活动限额
      <span>{{config.count}}</span> 人 已购
      <span>{{config.pay}}</span> 人
    </div>
  </div>
</template>

<script>
export default {
  name: "remainingTime",
  data() {
    return {
      timer: null,
      lastTime: 0,
      timeDown: {
        day: 8,
        hours: 0,
        minutes: 0,
        second: 0
      }
    };
  },
  props: ["config"],
  mounted() {
    // 计算截止日期到现在的总计时
    this.lastTime = this.config.deadline; // 设置截止日期
    const day = 1000 * 60 * 60 * 24;
    const now = new Date().getTime();
    this.timeDown.day = (this.lastTime - now) / day;
    this.timeDown.hours = ((this.lastTime - now) % day) / (1000 * 60 * 60);
    this.timeDown.minutes =
      ((this.lastTime - now) % (1000 * 60 * 60)) / (1000 * 60);
    this.timeDown.second = ((this.lastTime - now) % (1000 * 60)) / 1000;
    for (let item in this.timeDown) {
      this.timeDown[item] = (this.timeDown[item] + "")
        .slice(0, 2)
        .replace(".", "");
    }
    // 每隔一秒改变数据
    this.timer = setInterval(() => {
      if (this.timeDown.second <= 0) {
        if (this.timeDown.minutes <= 0) {
          if (this.timeDown.hours <= 0) {
            this.timeDown.day--;
            this.timeDown.hours = 23;
          }
          this.timeDown.hours--;
          this.timeDown.minutes = 59;
        }
        this.timeDown.minutes--;
        this.timeDown.second = 59;
      }
      this.timeDown.second--;
      if (this.timeDown.second <= 0 && this.timeDown.minutes <= 0 && this.timeDown.hours <= 0 && this.timeDown.day <= 0) {
        clearInterval(this.timer);
        this.timer = null;
        this.$emit('timeEnd');
      }
    }, 1000);
  },
  beforeDestroy() {
    // 清除定时器
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style lang="less" scoped>
.remaining-time {
  padding: 0 20px 10px 20px;
  font-size: 15px;
  background-color: #fff;
  margin-bottom: 20px;
  .time-down {
    text-align: center;
    width: 250px;
    height: 80px;
    margin: 0 auto 14px auto;
    padding: 25px 0 10px 0;
    border-radius: 10px;
    background: url(../../../assets/images/time-down-bg.png);
    background-size: 100% 100%;
    .time-down-day {
      color: #fb9f20;
      padding: 0 5px;
      span {
        color: #7329fe;
      }
    }
    .h-m-s {
      color: #7329fe;
      span {
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: #fff;
        font-size: 0.8rem;
        padding: 0;
        border-radius: 50%;
        background-color: #7329fe;
      }
    }
  }
  .progress {
    border-radius: 10px;
    margin: 5px 0;
    .progress-bar {
      text-align: right;
      border-radius: 10px;
      background: -webkit-linear-gradient(left, #ff0022, #ff9900);
    }
  }
  .count {
    text-align: right;
    font-size: 12px;
    color: #fb9f20;
    padding: 10px 0 0 0;
    span {
      color: #7329fe;
    }
  }
}
</style>