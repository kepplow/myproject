<template>
  <div class="coupon">
    <section class="banner">
      <banner-swiper :imgs="swiperImages"></banner-swiper>
    </section>

    <section class="plates">
      <board :config="rules"></board>
      <ul>
        <div class="tip">先领券再购物</div>
        <li v-for="(item, index) in coupon" :key="index">
          <div class="item">
            <div class="title">
              <span>{{parseInt(item.money)}}元</span>
              <br />
              {{item.type}}
            </div>
            <div class="info">
              <p>{{item.title}}</p>
              <p>有效期：{{`${item.endtime.split(' ')[0]}至${item.endtime.split(' ')[0]}`}}</p>
            </div>
            <div class="button" @click="showForm(item.id)">立即购买</div>
          </div>
        </li>
      </ul>
      <board :config="useinfo"></board>
      <board :config="companyInfo"></board>
    </section>

    <section class="tools">
      <sideBtnList @click="handleClick" :config="sideBtnConfig"></sideBtnList>
      <bottom-scroll-bar v-if="bottomScrollConfig.length >= 3" :config="bottomScrollConfig"></bottom-scroll-bar>
      <redPackets v-if="showRedPackets" @done="readingDone" :config="redPacketsConfig"></redPackets>
    </section>

    <footer>
      <baidu-map
        class="map"
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

    <b-modal id="modal-coupon" centered>
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

        <div class="opened-red-packets" v-if="modalsVisible.redPackets">
          <div class="amount">
            <span>阅读红包</span>
          </div>
          <div class="tip">恭喜获得</div>
        </div>

        <div class="share" v-if="modalsVisible.share">
          <b-img src="../../assets/images/shareImg.png" width="77" height="60" block></b-img>
          <b-img src="../../assets/images/shareText.png" width="150" height="40"></b-img>
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
          <b-button class="pay" @click="gopay">去支付</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import bannerSwiper from "../../components/bannerSwiper";
import sideBtnList from "../../components/sideBtnList";
import bottomScrollBar from "../../components/bottomScrollBar";
import board from "../../components/board";
import redPackets from "../../components/redPackets";
export default {
  name: "coupon",
  data() {
    return {
      // 地图配置
      mapConfig: {
        center: { lng: 109.45744048529967, lat: 36.49771311230842 },
        zoom: 13,
        bz_name: ""
      },
      did: "0",
      // 页脚
      componey: { name: "", value: "" },
      contact: { name: "", value: "" },
      // 底部滚动数据
      bottomScrollConfig: [],
      // 提交的表单信息
      submitForm: {
        username: "",
        mobile: "",
        type: "",
        id: ""
      },
      // 红包配置
      redPacketsConfig: {
        countStop: 30
      },
      // 红包是否显示
      showRedPackets: true,
      // 侧边栏配置
      sideBtnConfig: {
        music: "",
        phone: 11111111111,
        qrCode: ""
      },
      // 优惠券
      coupon: [
        {
          id: "",
          type: "",
          money: "",
          title: "",
          startime: "",
          endtime: ""
        }
      ],
      rules: {
        header: "活动规则",
        content: ""
      },
      companyInfo: {
        header: "公司介绍",
        content: ""
      },
      useinfo: {
        header: "使用说明",
        content: ""
      },
      // 显示的模态框
      modalsVisible: {
        "call-phone": false,
        share: false,
        redPackets: false,
        userInfo: true
      },
      // 轮播图片
      swiperImages: []
    };
  },
  components: {
    bannerSwiper,
    sideBtnList,
    board,
    bottomScrollBar,
    redPackets
  },
  methods: {
    // 去支付
    gopay(id) {
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
                that.$router.push(`/goodsDetails?type=1&id=${id}`);
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
    // 初始化数据
    init() {
      this.did =
        this.$route.query && this.$route.query.id
          ? this.$route.query.id
          : this.did;
      this.submitForm.type =
        this.$route.query && this.$route.query.type
          ? this.$route.query.type
          : 0;
      this.$axios({
        method: "post",
        url: "/api/activity/coupon/coupon",
        data: {
          id: this.did
        }
      }).then(res => {
        if (res.data && res.data.code == 1000) {
          let data = res.data.data;
          this.sideBtnConfig.music = data.musicfile;
          this.sideBtnConfig.phone = data.bz_leader_mobile;
          this.sideBtnConfig.qrCode = data.qrcode;
          this.swiperImages = data.images.split(",");
          this.componey = res.data.componey;
          this.contact = res.data.contact;
          this.rules.content = data.content;
          this.companyInfo.content = data.details;
          this.useinfo.content = data.useinfo;
          this.coupon = data.coupon;
          this.mapConfig.center.lng = data.lg;
          this.mapConfig.center.lat = data.la;
          this.mapConfig.center.bz_name = data.bz_name;
        }
      });
    },
    // 阅读完成
    readingDone() {
      this.changeModal("redPackets");
      this.$bvModal.show("modal-coupon");
      this.showRedPackets = false;
      let id = this.$route.query ? this.$route.query.id : "";
      let type = this.$route.query ? this.$route.query.type : "";
      this.$axios({
        method: "post",
        url: "/api/activity/dzp/read",
        data: {
          id,
          type
        }
      });
    },
    handleClick(config) {
      // 根据点击按钮切换模态框
      if (config && config.target == "phone") {
        this.changeModal("call-phone");
      } else if (config && config.target == "share") {
        this.changeModal("share");
      }
      this.$bvModal.show("modal-coupon");
    },
    // 展示表单
    showForm(id) {
      this.changeModal("userInfo");
      this.$bvModal.show("modal-coupon");
      this.submitForm.id = id;
    },
    changeModal(target) {
      for (let s in this.modalsVisible) {
        this.modalsVisible[s] = false;
      }
      this.modalsVisible[target] = true;
    }
  },
  mounted() {
    this.init();
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
.coupon {
  background-color: #f2f2f2;
  padding-bottom: 50px;
  .plates {
    position: relative;
    top: -40px;
    padding: 60px 10px 10px;
    background-color: #ffc942;
    border-top-left-radius: 50% 40px;
    border-top-right-radius: 50% 40px;
    z-index: 201;
    ul {
      padding: 0;
      list-style: none;
      margin-bottom: 60px;
      margin-top: 25px;
      border: 10px solid transparent;
      background-origin: border-box;
      background-clip: border-box;
      border-radius: 10px;
      background-image: linear-gradient(top, #7329fe, #e8794f);
      overflow: hidden;
      .tip {
        font-size: 18px;
        color: #fff;
      }
      li {
        margin-top: -1px;
        padding: 10px 20px;
        background-color: #ffc942;
        .item {
          margin: 0 auto;
          max-width: 285px;
          height: 85px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: url(../../assets/images/coupon-bg@2x.png);
          background-size: 100% 100%;
          padding: 10px 10px;
          .title {
            color: #ff4701;
            font-size: 15px;
            font-weight: bold;
            border-right: 1px solid #808080;
            padding-right: 5px;
            span {
              font-size: 24px;
            }
          }
          .info {
            margin-left: -18px;
            max-width: 120px;
            color: #ffc942;
            p {
              padding: 0;
              margin: 0;
              line-height: 20px;
            }
            p:nth-of-type(1) {
              font-size: 15px;
            }
            p:nth-of-type(2) {
              font-size: 13px;
            }
            p:nth-of-type(3) {
              font-size: 12px;
            }
          }
          .button {
            max-width: 37px;
            color: #fff;
            font-size: 18px;
          }
        }
      }
      li:nth-of-type(1) {
        padding-top: 30px;
        box-shadow: inset 0 10px 10px -5px #7329fe;
      }
      li:nth-last-of-type(1) {
        padding-bottom: 30px;
        box-shadow: inset 0 -10px 10px -5px #e8794f;
      }
    }
  }
  .board:not(:nth-of-type(1)) {
    margin-bottom: 60px;
  }
  footer {
    text-align: center;
    color: #fb9f20;
    font-size: 12px;
    margin-top: -30px;
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
/deep/#modal-coupon {
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