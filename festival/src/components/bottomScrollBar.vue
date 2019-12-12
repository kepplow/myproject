<template>
  <div class="bottom-scroll-bar">
    <ul ref="scroll-bar">
      <li>
        <b-img
          src="https://picsum.photos/250/250/?image=59"
          v-bind="mainProps"
          rounded="circle"
          alt="Circle image"
        ></b-img>
        <div class="message">
          <span class="name">李磊1</span>
          <span>支付成功！</span>
        </div>
      </li>
      <li>
        <b-img
          src="https://picsum.photos/250/250/?image=59"
          v-bind="mainProps"
          rounded="circle"
          alt="Circle image"
        ></b-img>
        <div class="message">
          <span class="name">李磊</span>
          <span>支付成功！</span>
        </div>
      </li>
      <li>
        <b-img
          src="https://picsum.photos/250/250/?image=59"
          v-bind="mainProps"
          rounded="circle"
          alt="Circle image"
        ></b-img>
        <div class="message">
          <span class="name">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
          <span>支付成功！</span>
        </div>
      </li>
      <li>
        <b-img
          src="https://picsum.photos/250/250/?image=59"
          v-bind="mainProps"
          rounded="circle"
          alt="Circle image"
        ></b-img>
        <div class="message">
          <span class="name">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
          <span>支付成功！</span>
        </div>
      </li>
      <li>
        <b-img
          src="https://picsum.photos/250/250/?image=59"
          v-bind="mainProps"
          rounded="circle"
          alt="Circle image"
        ></b-img>
        <div class="message">
          <span class="name">李磊1</span>
          <span>支付成功！</span>
        </div>
      </li>
      <li>
        <b-img
          src="https://picsum.photos/250/250/?image=59"
          v-bind="mainProps"
          rounded="circle"
          alt="Circle image"
        ></b-img>
        <div class="message">
          <span class="name">李磊</span>
          <span>支付成功！</span>
        </div>
      </li>
      <li>
        <b-img
          src="https://picsum.photos/250/250/?image=59"
          v-bind="mainProps"
          rounded="circle"
          alt="Circle image"
        ></b-img>
        <div class="message">
          <span class="name">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
          <span>支付成功！</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "bottomScrollBar",
  data() {
    return {
      timeId: "",
      mainProps: { width: 36, height: 36, class: "m1" }
    };
  },
  methods: {},
  mounted() {
    // 开始滚动，每隔两秒滚动一次
    this.timeId = setInterval(() => {
      let scrollBar = this.$refs["scroll-bar"];
      if (scrollBar.offsetTop < -138) {
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