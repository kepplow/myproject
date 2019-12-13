<template>
  <div class="bottom-scroll-bar">
    <ul ref="scroll-bar" @touchstart="handle">
      <li v-for="(item, index) in datalist" :key="index">
        <b-img
          :src="item.avatar"
          v-bind="mainProps"
          rounded="circle"
          alt="Circle image"
        ></b-img>
        <div class="message">
          <span class="name">{{item.uname}}</span>
          <span>支付成功！</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "bottomScrollBar",
  props: ['config'],
  data() {
    return {
      timeId: "",
      datalist: [],
      mainProps: { width: 36, height: 36, class: "m1" }
    };
  },
  methods: {
    handle (eve){
      eve.preventDefault();
    }
  },
  beforeMount() {
    this.datalist = [...this.config]
    for (let i = 0; i < 3; i++) {
      this.datalist.push({...this.config[i]})
    }
    
    // 开始滚动，每隔两秒滚动一次
    this.timeId = setInterval(() => {
      let scrollBar = this.$refs["scroll-bar"];
      if (scrollBar.offsetTop < -46 * (this.config.length-1)) {
        scrollBar.style.transition = "none";
        scrollBar.style.top = "0px";
        setTimeout(() => {
          scrollBar.style.transition = "1s all";
          scrollBar.style.top = "-46px";
        }, 60);
        return;
      }
      scrollBar.style.transition = "1s all";
      scrollBar.style.top = scrollBar.offsetTop - 46 + "px";
    }, 2000);
  },
  destroyed() {
    clearInterval(this.timeId);
  }
};
</script>

<style lang="less" scoped>
.bottom-scroll-bar {
  position: fixed;
  bottom: 60px;
  height: 138px;
  overflow: hidden;
  left: 10px;
  z-index: 201;
  ul {
    position: relative;
    top: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    transition: 2s all;
    li {
      display: flex;
      margin-bottom: 10px;
      align-items: center;
      img {
        margin-right: 10px;
      }
      .message {
        background-color: #000;
        border-radius: 15px;
        color: #fff;
        font-size: 15px;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        span {
          display: inline-block;
          vertical-align: top;
        }
        span.name {
          height: 30px;
          max-width: 150px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>