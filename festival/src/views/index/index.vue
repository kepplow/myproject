<template>
  <div class="activity">
    <section class="banner">
      <banner-swiper :imgs="swiperImages"></banner-swiper>
    </section>

    <section class="statistics">
      <div class="purchase-count-bg">
        <purchase-count :configs="purchaseConfig"></purchase-count>
      </div>
      <remaining-time :config="remainingConfig" @timeEnd="timeEnd"></remaining-time>
    </section>

    <section class="tip">
      <text-tip :config="detailsConfig"></text-tip>
    </section>

    <section class="details">
      <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1"></b-img>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=58" alt="Image 2"></b-img>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
    </section>

    <b-container class="bottom-btn" fluid>
      <b-row>
        <b-col class="poster-btn" @click="showPoser">海报</b-col>
        <b-col class="participate-btn" @click="showForm">报名有礼</b-col>
      </b-row>
    </b-container>

    <section class="tools">
      <sideBtnList @click="handleClick" :config="sideBtnConfig"></sideBtnList>
      <bottom-scroll-bar></bottom-scroll-bar>
      <redPackets v-if="showRedPackets" @done="readingDone" :config="redPacketsConfig"></redPackets>
    </section>

    <footer>
      <baidu-map class="map" :center="mapConfig.center" :zoom="mapConfig.zoom" @ready="mapReady" @click="gotoMap"></baidu-map>
      <div>商务合作：岑泽网络科技营销平台</div>
      <div>版权所有：岑泽网络科技营销平台</div>
    </footer>

    <b-modal id="modal-index" centered>
      <template v-slot:default="{hide}">
        <div class="call-phone" v-if="modalsVisible['call-phone']">
          <p class="number">
            客服电话：
            <span>{{sideBtnConfig.phone}}</span>
          </p>
          <b-button :href="`tel:${sideBtnConfig.phone}`">一键拨打</b-button>
          <b-img :src="sideBtnConfig.qrCode" width="126" height="126" block></b-img>
          <p class="tip">请扫码联系我们</p>
        </div>

        <div class="share" v-if="modalsVisible.share">
          <b-img src="../../assets/images/shareImg.png" width="77" height="60" block></b-img>
          <b-img src="../../assets/images/shareText.png" width="150" height="40"></b-img>
        </div>

        <div class="opened-red-packets" v-if="modalsVisible.redPackets">
          <div class="amount">
            <span>阅读红包</span>
          </div>
          <div class="tip">恭喜获得</div>
        </div>

        <div class="poster" v-if="modalsVisible.poster">
          <p class="tip">长按图片保存海报</p>
          <div>
            <b-img src="../../assets/images/codeImg.png" width="200" height="300"></b-img>
          </div>
          <b-button @click="hide()">关闭</b-button>
        </div>

        <div class="userInfo" v-if="modalsVisible.userInfo">
          <div class="form">
            <p class="tip">请留下您的联系方式以便我们及时联系您</p>
            <b-form-input class="user-name" v-model="submitForm.userName" placeholder="请输入姓名"></b-form-input>
            <b-form-input
              class="phone"
              v-model="submitForm.phone"
              type="tel"
              maxlength="11"
              placeholder="请输入电话号码"
            ></b-form-input>
          </div>
          <b-button class="pay">支付100元抢购</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import bannerSwiper from "../../components/bannerSwiper";
import purchaseCount from "./components/purchaseCount";
import remainingTime from "./components/remainingTime";
import sideBtnList from "../../components/sideBtnList";
import textTip from "./components/textTip";
import bottomScrollBar from "../../components/bottomScrollBar";
import redPackets from "../../components/redPackets";
export default {
  name: "index",
  data() {
    return {
      mapConfig: {
        center: { lng: 109.45744048529967, lat: 36.49771311230842 },
        zoom: 13
      },
      // 红包配置
      redPacketsConfig: {
        countStop: 0
      },
      // 详情
      detailsConfig: {
        content: ""
      },
      // 侧边栏配置
      sideBtnConfig: {
        music: "",
        phone: 18042119961,
        qrCode: ""
      },
      // 活动结束倒计时
      remainingConfig: {
        deadline: 1577776304000,
        count: 1000,
        pay: 0
      },
      // 红包是否显示
      showRedPackets: false,
      // 提交的表单信息
      submitForm: {
        userName: "",
        phone: "",
        number: 1
      },
      // 显示的模态框
      modalsVisible: {
        "call-phone": false,
        share: false,
        poster: false,
        userInfo: false,
        redPackets: true
      },
      // 轮播图片
      swiperImages: [],
      // 购买数量配置
      purchaseConfig: {
        looks: 100000,
        pay: 101,
        avatars: [
          "https://picsum.photos/1024/400/?image=41",
          "https://picsum.photos/1024/400/?image=41",
          "https://picsum.photos/1024/400/?image=41",
          "https://picsum.photos/1024/400/?image=41"
        ]
      }
    };
  },
  components: {
    bannerSwiper,
    purchaseCount,
    remainingTime,
    sideBtnList,
    textTip,
    bottomScrollBar,
    redPackets
  },
  methods: {
    gotoMap () {
      location.href = 'http://api.map.baidu.com/marker?location=40.047669,116.313082&title=我在这&content=百度奎科大厦&output=html'
    },
    // 初始化地图
    mapReady({ BMap, map }) {
      var point = new BMap.Point(109.49926175379778, 36.60449676862417);
      map.centerAndZoom(point, 13);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      var circle = new BMap.Circle(point, 6, {
        strokeColor: "Red",
        strokeWeight: 6,
        strokeOpacity: 1,
        Color: "Red",
        fillColor: "#f03"
      });
      map.addOverlay(circle);
    },
    // 活动倒计时结束
    timeEnd() {
      alert("finish");
    },
    // 阅读完成
    readingDone() {
      this.changeModal("redPackets");
      this.$bvModal.show("modal-index");
      this.showRedPackets = false;
    },
    showPoser() {
      this.changeModal("poster");
      this.$bvModal.show("modal-index");
    },
    showForm() {
      this.changeModal("userInfo");
      this.$bvModal.show("modal-index");
    },
    handleClick(config) {
      // 根据点击按钮切换模态框
      if (config && config.target == "phone") {
        this.changeModal("call-phone");
      } else if (config && config.target == "share") {
        this.changeModal("share");
      }
      this.$bvModal.show("modal-index");
    },
    changeModal(target) {
      for (let s in this.modalsVisible) {
        this.modalsVisible[s] = false;
      }
      this.modalsVisible[target] = true;
    },
    initData() {
      let that = this;
      this.$axios({
        methods: "post",
        url: "/api/activity/baoming/getactivity",
        params: {
          id: 1
        }
      }).then(res => {
        if (res.data && res.data.code == "1000") {
          let tmpData = res.data.data;
          that.remainingConfig.deadline = tmpData.endtime * 1000;
          that.remainingConfig.count = tmpData.join_num;
          that.remainingConfig.pay = tmpData.joined_num;
          that.swiperImages = tmpData.bannerimages.split(",");
          that.sideBtnConfig.music = tmpData.musicfile;
          that.sideBtnConfig.phone = tmpData.contact_mobile;
          that.sideBtnConfig.qrCode = tmpData.contact_qrcode_image;
          that.purchaseConfig.looks = tmpData.view_num;
          that.purchaseConfig.pay = tmpData.joined_num;
          that.detailsConfig.content = tmpData.content;
          that.detailsConfig.title = tmpData.title;
          that.redPacketsConfig.countStop = tmpData.hongbao_page_stop;
          that.showRedPackets = true;
        } else {
          alert(res.msg);
        }
      });
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
.activity {
  background-color: #f2f2f2;
  padding-bottom: 50px;
  .purchase-count-bg {
    height: 60px;
  }
  .purchase-count {
    position: relative;
    top: -34px;
    z-index: 1;
    margin: 0 10px;
  }
  .bottom-btn {
    position: fixed;
    bottom: -1px;
    color: #fff;
    z-index: 1000;
    .poster-btn {
      background-color: #fb9f20;
      font-size: 1.2rem;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
    div:nth-of-type(2) {
      background-color: #ff4701;
      font-size: 1.2rem;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
  }
  footer {
    text-align: center;
    color: #fb9f20;
    font-size: 12px;
    margin-top: 10px;
    .map {
      width: 95%;
      margin: 20px auto;
      border: 1px solid #fff;
      height: 200px;
    }
  }
}
/deep/#modal-index {
  .modal-header,
  .modal-footer {
    display: none;
  }
  .modal-content {
    width: auto;
    max-width: 250px;
    margin: 0 auto;
    .modal-body {
      content: "";
      padding: 0;
      border: none;
      .call-phone {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px;
        .number {
          font-size: 18px;
          font-weight: bold;
          margin: 0;
        }
        a {
          width: 130px;
          height: 35px;
          font-size: 15px;
          line-height: 35px;
          padding: 0;
          margin: 24px;
          background-color: #7329fe;
        }
        .tip {
          margin: 25px 0 0 0;
          font-size: 12px;
          color: #808080;
        }
      }
      .share {
        background-color: transparent;

        img:nth-of-type(1) {
          position: fixed;
          margin: 0;
          top: 15px;
          right: 40px;
        }
        img:nth-of-type(2) {
          position: fixed;
          margin: 0;
          top: 75px;
          right: 110px;
        }
      }
      .opened-red-packets {
        width: 200px;
        height: 188px;
        display: flex;
        justify-content: center;
        background: url(../../assets/images/opened-redPackets.png);
        background-size: 100% 100%;
        .amount {
          text-align: center;
          position: absolute;
          top: 60px;
          color: #ff4701;
          font-size: 15px;
          // span:nth-of-type(2) {
          //   color: #fff;
          //   font-weight: bold;
          //   font-size: 24px;
          // }
        }
        .tip {
          width: 76px;
          color: #ff4701;
          position: absolute;
          bottom: 34px;
          text-align: center;
          font-size: 12px;
          background-color: #fff;
          border-radius: 10px;
        }
      }
      .poster {
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .tip {
          color: #808080;
          font-size: 15px;
          margin: 0 0 20px 0;
        }
        button {
          width: 50px;
          height: 20px;
          line-height: 20px;
          background-color: #fb9f20;
          font-size: 12px;
          padding: 0;
          margin: 15px 0 0 0;
          outline: none;
          border: none;
        }
      }
      .userInfo {
        width: calc(100vw - 20px);
        position: fixed;
        left: 10px;
        bottom: 100px;
        background-color: #fff;
        text-align: center;
        border-radius: 5px;
        .form {
          text-align: left;
          padding: 10px;
          .tip {
            color: #fb9f20;
            font-size: 14px;
          }
          .user-name {
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            margin-bottom: 15px;
          }
          .phone {
            font-size: 12px;
            height: 30px;
            line-height: 30px;
            margin-bottom: 30px;
          }
        }
        .pay {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          font-size: 18px;
          border: none;
          background-color: #ff4701;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }
      }
    }
  }
}
</style>