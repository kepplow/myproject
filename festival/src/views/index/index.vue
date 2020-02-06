<template>
  <div class="activity">
    <section class="banner">
      <banner-swiper :imgs="swiperImages"></banner-swiper>
    </section>

    <section class="statistics">
      <div class="purchase-count-bg">
        <purchase-count :configs="purchaseConfig"></purchase-count>
      </div>
      <remaining-time v-if="remainingConfig.deadline != 0" :config="remainingConfig" @timeEnd="timeEnd"></remaining-time>
    </section>

    <section class="tip">
      <text-tip :config="detailsConfig"></text-tip>
    </section>

    <!-- <section class="details">
      <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1"></b-img>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=58" alt="Image 2"></b-img>
      <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=59" alt="Image 3"></b-img>
    </section>-->

    <b-container class="bottom-btn" fluid>
      <b-row>
        <b-col class="poster-btn" @click="showPoser">海报</b-col>
        <b-col class="participate-btn" @click="showForm">报名有礼</b-col>
      </b-row>
    </b-container>

    <section class="tools">
      <sideBtnList @click="handleClick" :config="sideBtnConfig"></sideBtnList>
      <bottom-scroll-bar v-if="bottomScrollConfig.length >= 3" :config="bottomScrollConfig"></bottom-scroll-bar>
      <redPackets v-if="showRedPackets" @done="readingDone" :config="redPacketsConfig"></redPackets>
    </section>

    <footer>
      <baidu-map
        class="map"
        v-if="mapConfig.center.lng && mapConfig.center.lat"
        :center="mapConfig.center"
        :zoom="mapConfig.zoom"
        @ready="mapReady"
        @click="gotoMap"
      ></baidu-map>
      <div>
        <a :href="'tel:' + componey.value">{{componey.name}}</a>
      </div>
      <div>
        <a :href="'tel:' + contact.value">{{contact.name}}</a>
      </div>
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
            <b-img :src="posterImg" width="200" height="300"></b-img>
          </div>
          <b-button @click="hide()">关闭</b-button>
        </div>

        <div class="userInfo" v-if="modalsVisible.userInfo">
          <div class="form">
            <p class="tip">请留下您的联系方式以便我们及时联系您</p>
            <b-form-input class="user-name" v-model="submitForm.username" placeholder="请输入姓名"></b-form-input>
            <b-form-input
              class="phone"
              v-model="submitForm.mobile"
              type="tel"
              maxlength="11"
              placeholder="请输入电话号码"
            ></b-form-input>
          </div>
          <b-button class="pay" @click="goPay">立即抢购</b-button>
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
import wx from "weixin-js-sdk";
export default {
  name: "index",
  data() {
    return {
      did: "",
      // 地图配置 center：中心点经纬度坐标， zoom 缩放级别
      mapConfig: {
        center: { lng: 0, lat: 0 },
        zoom: 13
      },
      // 页脚
      componey: { name: "", value: "" },
      contact: { name: "", value: "" },
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
        deadline: 0,
        count: 0,
        pay: 0
      },
      // 红包是否显示
      showRedPackets: false,
      // 提交的表单信息
      submitForm: {
        username: "",
        mobile: "",
        type: "",
        id: ""
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
      // 底部弹幕
      bottomScrollConfig: [],
      // 海报
      posterImg: "",
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
    // 去支付
    goPay() {
      let that = this;
      this.$axios({
        url: "/api/activity/userinfo/order",
        method: "post",
        data: this.submitForm
      }).then(res => {
        if (res.data.code == "1000") {
          wx.chooseWXPay({
            //此方法应放在调用后台统一下单接口成功后回调里面，接口返回  timeStamp，nonceStr，package，paySign等参数
            timestamp: res.data.timeStamp,
            nonceStr: res.data.nonceStr,
            package: res.data.package,
            signType: res.data.signType,
            paySign: res.data.paySign,
            appId: res.data.appId, //此参数可不用
            success: function(r) {
              // 支付成功后的回调函数
              if (r.errMsg == "chooseWXPay:ok") {
                //支付成功
                location.reload();
                // that.$router.push(`/goodsDetails?type=1&id=${id}`);
              } else {
                location.reload(); //支付失败 刷新界面
              }
            },
            cancel: function(r) {
              //支付取消
              location.reload();
            }
          });
        } else {
          this.$bvModal.msgBoxOk(res.data.msg, {
            title: "提示！",
            size: "sm",
            buttonSize: "sm",
            okVariant: "success",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true
          });
        }
      });
    },
    // 去百度地图搜索
    gotoMap() {
      location.href = `http://api.map.baidu.com/marker?location=${this.mapConfig
        .center.lng || 0},${this.mapConfig.center.lat ||
        0}&title=我在这&content=${this.mapConfig.center.bz_name}&output=html`;
    },
    // 初始化地图
    mapReady({ BMap, map }) {
      // 设置地图中心点
      var point = new BMap.Point(
        this.mapConfig.center.lng,
        this.mapConfig.center.lat
      );
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
    // 展示海报
    showPoser() {
      this.changeModal("poster");
      this.$bvModal.show("modal-index");
    },
    // 显示表单
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
    // 初始化数据
    initData() {
      this.submitForm.id = this.did =
        this.$route.query && this.$route.query.id ? this.$route.query.id : "";
      this.submitForm.type =
        this.$route.query && this.$route.query.type
          ? this.$route.query.type
          : 0;
      let that = this;
      this.$axios({
        method: "post",
        url: "/api/activity/baoming/getactivity",
        params: {
          id: this.did
        }
      }).then(res => {
        if (res.data && res.data.code == "1000") {
          let tmpData = res.data.data;
          this.componey = res.data.componey;
          this.contact = res.data.contact;
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
          that.purchaseConfig.avatars = tmpData.avatars;
          that.posterImg = tmpData.posterImg;
          that.redPacketsConfig.countStop = tmpData.hongbao_page_stop;
          that.showRedPackets = true;
          that.mapConfig.center.lng = tmpData.business.lg
            ? tmpData.business.lg
            : that.mapConfig.center.lng;
          that.mapConfig.center.lat = tmpData.business.la
            ? tmpData.business.la
            : that.mapConfig.center.lat;
        } else {
          this.$bvModal.msgBoxOk(res.msg, {
            title: "提示！",
            size: "sm",
            buttonSize: "sm",
            okVariant: "success",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true
          });
        }
      });
    }
  },
  mounted() {
    this.initData();
  },
  beforeMount() {
    // 对接微信api
    this.$axios({
      method: "post",
      url: "/api/activity/userinfo/js",
      data: {
        type: this.$route.query.type,
        id: this.$route.query.id
      }
    }).then(res => {
      if (res.data && res.data.code == 1000) {
        var {
          appId,
          timestamp,
          nonceStr,
          signature,
          jsApiList
        } = res.data.data;
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名
          jsApiList // 必填，需要使用的JS接口列表
        });
      }
    }); 
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
    div {
      a {
        color: #fb9f20;
      }
    }
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
  .modal-dialog {
    margin: 0!important;
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