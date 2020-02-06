<template>
  <div class="side-btn-list">
    <ul>
      <li :class="['music', {rotate: this.isRotate} ]" @click="stopMusic">
        <audio ref="music" :src="config.music" loop autoplay></audio>
        <span class="icon iconfont">&#xe60e;</span>
      </li>
      <li @click="$emit('click', {target: 'phone'})">
        <span class="phone"></span>
      </li>
      <li @click="$emit('click', {target: 'share'})">
        <span class="icon iconfont">&#xe62d;</span>
      </li>
      <li @click="$router.push('/user')">
        <span class="icon iconfont">&#xe632;</span>
      </li>
    </ul>
  </div>
</template>

<script>
require('../assets/fonts/iconfont.css')
export default {
  name: "sideBtnList",
  data() {
    return {
      isRotate: true,
      music: null
    };
  },
  props: ['config'],
  methods: {
    // 暂停和开始音乐
    stopMusic() {
      if (this.music.paused) {
        this.music.play();
        this.isRotate = true;
      } else {
        this.music.pause();
        this.isRotate = false;
      }
    }
  },
  mounted() {
    this.music = this.$refs.music;
  }
};
</script>

<style lang="less" scoped>
.side-btn-list {
  position: fixed;
  top: 20px;
  right: 10px;
  z-index: 1000;
  ul {
    list-style: none;
    li {
      width: 30px;
      height: 30px;
      line-height: 30px;
      background-color: rgba(0, 0, 0, .3);
      margin-top: 10px;
      border-radius: 50%;
      color: #fff;
      span {
        font-size: 20px;
      }
      span.phone {
        display: inline-block;
        width: 25px;
        height: 25px;
        line-height: 25px;
        background: url(../assets/images/phone.gif) no-repeat;
        background-size: 100% 100%;
      }
    }
    .music.rotate {
      transition: 3s;
      animation: 3s rotateMusic infinite linear;
    }
  }
}
@keyframes rotateMusic {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>