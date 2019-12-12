<template>
  <div class="banner-swiper">
    <div class="swiper-box">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image, index) in imgs" :key="index">
          <div
            :data-background="image"
            class="swiper-lazy swiper-img"
          ></div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import "swiper/css/swiper.min.css";
import Swiper from "swiper";
export default {
  name: 'bannerSwiper',
  data() {
    return {};
  },
  props: ['imgs'],
  mounted() {
    var mySwiper = new Swiper(".swiper-box", {
      lazy: {
        loadPrevNext: true
      },
      direction: "horizontal",
      watchSlidesVisibility: true,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      //使用分页器
      autoplay: {
        delay: 5000,
        disableOnInteraction: true //触碰后自动切换停止
      }
    });
  }
};
</script>

<style lang="less" scoped>
.banner-swiper {
  .swiper-slide {
    position: relative;
    .swiper-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  }
  .swiper-slide:before {
    content: "";
    display: block;
    padding-top: 80%;
  }
}
</style>