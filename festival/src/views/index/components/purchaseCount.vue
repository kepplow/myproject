<template>
  <div class="purchase-count">
    <div class="count">
      <div>
        <span>{{configs.looks || 0}}</span>次浏览
      </div>
      <div>
        <span>{{configs.pay || 0}}</span>人购买
      </div>
    </div>
    <div class="avatar">
      <ul>
        <li v-for="(img, index) in configs.avatars" :key="index">
          <b-img :src="img" v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "purchaseCount",
  data() {
    return {
      mainProps: { width: 36, height: 36, class: "m1" },
      imgs: ""
    };
  },
  props: ["configs"]
};
</script>

<style lang="less" scoped>
.purchase-count {
  background-color: #fff;
  display: flex;
  padding: 10px 20px;
  align-items: center;
  border-radius: 10px;
  justify-content: space-between;
   box-shadow:0px -9px 16px 0px rgba(0,0,0,0.48);
  .count {
    font-size: 12px;
    text-align: left;
    color: #FB9F20;
    span {
      font-size: 18px;
    }
  }
  ul {
    list-style: none;
    display: flex;
    margin-bottom: 0;
    li {
      img {
        margin-left: -12px;
        border: 1.5px solid #fff;
      }
    }
  }
}
</style>