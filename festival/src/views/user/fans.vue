<template>
  <div class="fans">
    <div class="header">
      <div class="bg-box">
        <div class="title">拓展记录</div>
        <div class="count">100</div>
      </div>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item, index) in fans" :key="index">
          <span class="time">{{item.time}}</span>
          <span>
            <img :src="item.avatar" />
            <span class="name">{{item.uname}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "fans",
  data() {
    return {
      fans: []
    };
  },
  methods: {
    init () {
      this.$axios({
        url: '/api/activity/userinfo/refans',
        method: 'post'
      }).then(res => {
        // console.log(res)
        if (res.data.code == '1000') {
          let data = res.data.data;
          this.fans = data;
        }
      })
    }
  },
  mounted () {
    this.init()
  }
};
</script>

<style lang="less" scoped>
.fans {
  padding: 0 10px;
  background-color: #fff;
  .header {
    width: 100%;
    height: 250px;
    background-color: #7329fe;
    overflow: hidden;
    .bg-box {
      position: relative;
      width: 263px;
      height: 214px;
      left: calc(50% - 131px);
      bottom: -40px;
      background: url(../../assets/images/fans-title-bg.png) no-repeat;
      background-size: 100% 100%;
      .title {
        font-size: 24px;
        color: #000;
        position: absolute;
        left: 0;
        right: 0;
        top: 45px;
      }
      .count {
        position: absolute;
        right: 12px;
        top: 150px;
        color: black;
        font-size: 18px;
        width: 81px;
        height: 32px;
        background: url(../../assets/images/fans-count-bg.png);
        background-size: 100% 100%;
      }
    }
  }
  .content {
    padding: 10px;
    ul {
        list-style: none;
        padding: 0;
        color: #808080;
        li {
            margin-top: 22px;
            font-size: 15px;
            display: flex;
            padding-bottom: 5px;
            justify-content: space-between;
            border-bottom: 1px solid rgba(128, 128, 128, .3);
            img {
                display: inline-block;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 5px;
            }
        }
    }
  }
}
</style>