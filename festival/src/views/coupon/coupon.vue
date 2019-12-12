<template>
  <div class="coupon">
    <section class="banner">
      <banner-swiper :imgs="swiperImages"></banner-swiper>
    </section>

    <section class="plates">
      <board :config="companyInfo"></board>
      <ul>
        <div class="tip">先领券再购物</div>
        <li>
          <div class="item">
            <div class="title">
              <span>3元</span>
              <br />满减券
            </div>
            <div class="info">
              <p>活动全场</p>
              <p>满5减3</p>
              <p>有效期：11.22-11.30</p>
            </div>
            <div class="button" @click="showForm">立即购买</div>
          </div>
        </li>
        <li>
          <div
            class="item"
            :style="`background-image: url(${require('../../assets/images/coupon-gray-bg@2x.png')})`"
          >
            <div class="title">
              <span>3元</span>
              <br />满减券
            </div>
            <div class="info">
              <p>活动全场</p>
              <p>满5减3</p>
              <p>有效期：11.22-11.30</p>
            </div>
            <div class="button" @click="showForm">立即购买</div>
          </div>
        </li>
      </ul>
      <board :config="companyInfo"></board>
      <board :config="companyInfo"></board>
      <board :config="companyInfo"></board>
    </section>

    <section class="tools">
      <sideBtnList @click="handleClick" :config="sideBtnConfig"></sideBtnList>
      <bottom-scroll-bar></bottom-scroll-bar>
      <redPackets v-if="showRedPackets" @done="readingDone" :config="redPacketsConfig"></redPackets>
    </section>

    <footer>
      <div>商务合作：岑泽网络科技营销平台</div>
      <div>版权所有：岑泽网络科技营销平台</div>
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
import sideBtnList from "../../components/sideBtnList";
import bottomScrollBar from "../../components/bottomScrollBar";
import board from "../../components/board";
import redPackets from "../../components/redPackets";
export default {
  name: "coupon",
  data() {
    return {
      // 提交的表单信息
      submitForm: {
        userName: "",
        phone: "",
        number: 1
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
        phone: 18042119961,
        qrCode: ""
      },
      companyInfo: {
        header: "公司介绍",
        content: `
        
        
        `
      },
      // 显示的模态框
      modalsVisible: {
        "call-phone": false,
        share: false,
        redPackets: false,
        userInfo: true
      },
      // 轮播图片
      swiperImages: [
        require("../../assets/images/banner.jpg"),
        "https://picsum.photos/1024/480/?image=58",
        "https://picsum.photos/1024/480/?image=52"
      ]
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
    // 阅读完成
    readingDone() {
      this.changeModal("redPackets");
      this.$bvModal.show("modal-coupon");
      this.showRedPackets = false;
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
    showForm() {
      this.changeModal("userInfo");
      this.$bvModal.show("modal-coupon");
    },
    changeModal(target) {
      for (let s in this.modalsVisible) {
        this.modalsVisible[s] = false;
      }
      this.modalsVisible[target] = true;
    }
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
          max-width: 285px;
          height: 85px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: url(../../assets/images/coupon-bg@2x.png);
          background-size: 100% 100%;
          padding: 10px 10px;
          .title {
            width: 60px;
            color: #ff4701;
            font-size: 15px;
            font-weight: bold;
            border-right: 1px solid #808080;
            padding-right: 10px;
            span {
              font-size: 30px;
            }
          }
          .info {
            margin-left: -10px;
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
    margin-top: 10px;
  }
}
/deep/#modal-coupon {
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