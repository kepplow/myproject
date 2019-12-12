<template>
  <div class="turntable">
    <section class="banner">
      <banner-swiper :imgs="swiperImages"></banner-swiper>
    </section>

    <section class="turntable-box">
      <div class="turntable-bg">
        <div class="time-down-box">
          <p>活动结束倒计时</p>
          <div class="d-h-m-s">
            <span>99</span> 天
            <span>23</span> 时
            <span>59</span> 分
            <span>59</span> 秒
          </div>
        </div>
        <div class="plate-box">
          <span
            ref="plate"
            :class="{plate: true, 'action': false}"
            :style="`transition: all 3s;transform: rotate(${-90 - 360/rotateItems.length/2}deg);`"
            @transitionend="rotateEnd"
          >
            <div v-for="(item, index) in rotateItems" :key="index">
              <div
                class="item"
                :style="'transform: rotate('+ index * (360/(rotateItems.length))+'deg);'"
              >
                <canvas
                  :ref="'cs-turntable-' + index"
                  width="212"
                  height="212"
                  style="border-radius: 50%;"
                ></canvas>
              </div>
              <div
                class="item-info"
                :style="'transform: rotate('+ index * (360/(rotateItems.length))+'deg);'"
              >
                <b-img
                  :src="item.image"
                  :style="`
                    width: ${70 - rotateItems.length *4.2}px;
                    height: ${70 - rotateItems.length *4.2}px;
                    right: ${60 + (4 * (9 - rotateItems.length))}px;
                    transform: rotate(${90 + 180/rotateItems.length}deg);
                    `"
                ></b-img>
                <span
                  class="title"
                  :style="`
                  transform: rotate(${90 + 180/rotateItems.length}deg) translateX(${25 + 10 * (9 - rotateItems.length)}px) translateY(${rotateItems.length == 3 ? -20 : -15 + rotateItems.length * 5}px);
                  font-size:${21-rotateItems.length}px;
                  right: 0px;
                  
                  `"
                >{{item.title}}</span>
              </div>
            </div>
          </span>
          <span class="start" @click="startRotate"></span>
        </div>
        <b-button class="my-prize" @click="$router.push('/myPrize')">我的奖品</b-button>
      </div>
    </section>

    <section class="activity-info">
      <board v-for="(item, index) in boardItems" :key="index" :config="item"></board>
    </section>

    <footer>
      <div>商务合作：岑泽网络科技营销平台</div>
      <div>版权所有：岑泽网络科技营销平台</div>
    </footer>

    <!-- <b-container class="bottom-btn" fluid>
      <b-row>
        <b-col class="poster-btn" @click="showPoser">海报</b-col>
        <b-col class="participate-btn" @click="showForm">报名有礼</b-col>
      </b-row>
    </b-container> -->

    <section class="tools">
      <sideBtnList @click="handleClick" :config="sideBtnConfig"></sideBtnList>
      <bottom-scroll-bar></bottom-scroll-bar>
      <redPackets v-if="showRedPackets" @done="readingDone" :config="redPacketsConfig"></redPackets>
      <div class="poster" @click="showPoser">海报</div>
    </section>

    <b-modal id="modal-turntable" centered>
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

        <div class="prize" v-if="modalsVisible.prize">
          <b-img class="pic"></b-img>
          <div class="tip">
            恭喜获得
            <span>京东100元抵用券</span>
          </div>
          <b-button @click="$router.push('/myPrize')">查看奖品</b-button>
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
import sideBtnList from "../../components/sideBtnList";
import bottomScrollBar from "../../components/bottomScrollBar";
import board from "../../components/board";
import redPackets from "../../components/redPackets";
export default {
  name: "turntable",
  data() {
    return {
      // 红包配置
      redPacketsConfig: {
        countStop: 30
      },
      // 侧边栏配置
      sideBtnConfig: {
        music: "",
        phone: 18042119961,
        qrCode: ""
      },
      // 红包是否显示
      showRedPackets: true,
      boardItems: [
        {
          header: "活动规则",
          content: "内容内容内容内容内容内容内容内容内容内容"
        },
        {
          header: "活动规则",
          content: "内容内容内容内容内容内容内容内容内容内容"
        },
        {
          header: "活动规则",
          content: "内容内容内容内容内容内容内容内容内容内容"
        }
      ],
      // 转盘奖品
      rotateItems: [
        {
          title: "谢谢参与",
          image: "https://picsum.photos/1024/400/?image=41"
        },
        {
          title: "一等奖",
          image: "https://picsum.photos/1024/400/?image=41"
        },
        {
          title: "二等奖",
          image: "https://picsum.photos/1024/400/?image=41"
        },
        {
          title: "三等奖",
          image: "https://picsum.photos/1024/400/?image=41"
        },
        {
          title: "四等奖",
          image: "https://picsum.photos/1024/400/?image=41"
        },
        {
          title: "三等奖",
          image: "https://picsum.photos/1024/400/?image=41"
        },
        {
          title: "四等奖",
          image: "https://picsum.photos/1024/400/?image=41"
        },
        {
          title: "四等奖",
          image: "https://picsum.photos/1024/400/?image=41"
        },
        {
          title: "三等奖",
          image: "https://picsum.photos/1024/400/?image=41"
        }
      ],
      // 提交的表单数据
      submitForm: {
        userName: "",
        phone: ""
      },
      // 显示的模态框
      modalsVisible: {
        "call-phone": false,
        share: false,
        poster: false,
        userInfo: false,
        prize: false,
        redPackets: true
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
    bottomScrollBar,
    board,
    redPackets
  },
  mounted() {
    this.craetCanvas();
  },
  methods: {
    // 阅读完成
    readingDone() {
      this.changeModal("redPackets");
      this.$bvModal.show("modal-turntable");
      this.showRedPackets = false;
    },
    craetCanvas() {
      this.rotateItems.forEach((ele, index) => {
        let ctx = this.$refs["cs-turntable-" + index][0].getContext("2d");
        ctx.beginPath();
        ctx.moveTo(106, 106);
        ctx.lineTo(212, 106); //设置末端状态
        ctx.lineWidth = 1; //设置线宽状态
        ctx.strokeStyle = "#000"; //设置线的颜色状态
        ctx.stroke(); //进行绘制
        ctx.arc(106, 106, 106, 0, (Math.PI * 2) / this.rotateItems.length);
        ctx.closePath();
        ctx.stroke();
        if (index % 2 == 1) {
          ctx.fillStyle = "#ffc942";
        } else {
          ctx.fillStyle = "#7329fe";
        }
        ctx.fill();
      });
    },
    // 开始旋转
    startRotate() {
      let plate = this.$refs.plate; // 操作的圆盘
      let angle = -90 - 360 / this.rotateItems.length / 2; //初始角度
      let target = 2; // 将要中的奖品号

      plate.style.transition = "all 3s";
      // 查找与中奖号码相对应的旋转角度
      this.rotateItems.forEach((ele, index) => {
        if (target == index) {
          angle += 360 * 5 - (index * 360) / this.rotateItems.length;
          plate.style.transform = `rotate(${angle}deg)`;
          return;
        }
      });
    },
    rotateEnd() {
      let plate = this.$refs.plate;
      // 重置转盘角度
      plate.style.transition = "none";
      let oAngle = plate.style.transform,
        nAngle = oAngle.slice(7, oAngle.indexOf("deg")) % 360;
      plate.style.transform = `rotate(${nAngle}deg)`;
      // 显示奖品模态框
      this.changeModal("prize");
      this.$bvModal.show("modal-turntable");
    },
    showPoser() {
      this.changeModal("poster");
      this.$bvModal.show("modal-turntable");
    },
    showForm() {
      this.changeModal("userInfo");
      this.$bvModal.show("modal-turntable");
    },
    handleClick(config) {
      // 根据点击按钮切换模态框
      if (config && config.target == "phone") {
        this.changeModal("call-phone");
      } else if (config && config.target == "share") {
        this.changeModal("share");
      }
      this.$bvModal.show("modal-turntable");
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
.turntable {
  background-color: #f2f2f2;
  padding-bottom: 50px;
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
  .turntable-box {
    margin-top: 10px;
    background-color: #7329fe;
    .turntable-bg {
      background: url(../../assets/images/turntable-bg.png) no-repeat;
      background-size: 100% 100%;
      background-position: -40px -20px;
    }
    .time-down-box {
      display: inline-block;
      width: 300px;
      height: 90px;
      background-size: 100% 100%;
      margin: -10px auto 0 auto;
      color: #fb9f20;
      background-image: url(../../assets/images/time-down-bg2.png);
      p {
        display: inline-block;
        margin: 28px auto auto 0;
        font-size: 12px;
      }
      .d-h-m-s {
        font-size: 14px;
        margin-top: 6px;
        span {
          display: inline-block;
          color: #fff;
          background-color: #7329fe;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          line-height: 24px;
        }
      }
    }
    .plate-box {
      width: 280px;
      height: 284px;
      position: relative;
      margin: 40px auto;
      .plate {
        width: 280px;
        height: 280px;
        position: absolute;
        top: 0;
        left: 0;
        background-image: url(../../assets/images/turntable.png);
        background-size: 100% 100%;
        animation-fill-mode: forwards;
        transform: rotate(0deg);
        // 奖项
        .item {
          width: 212px;
          height: 212px;
          position: absolute;
          top: 34px;
          left: 34px;
          canvas {
            background: transparent;
          }
        }
        .item-info {
          position: relative;
          top: 140px;
          left: 0;
          z-index: 201;
        }
        .title {
          position: absolute;
          top: 5px;
          right: 0px;
          z-index: 201;
          font-size: 12px;
        }
        img {
          position: absolute;
          top: 5px;
          right: 45px;
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
      .start {
        display: inline-block;
        width: 52px;
        height: 60px;
        position: absolute;
        top: 110px;
        left: 114px;
        transform-origin: 26px 34px;
        background-image: url(../../assets/images/start.png);
        background-size: 100% 100%;
      }
    }
    .plate.action {
      animation: 3s startRotate;
    }
    .my-prize {
      width: 200px;
      height: 40px;
      line-height: 40px;
      padding: 0;
      color: #7329fe;
      font-size: 24px;
      font-weight: bold;
      border-radius: 20px;
      border: none;
      background-color: #ffc942;
      box-shadow: 0 0 10px #ffc942;
      margin-bottom: 50px;
    }
  }
  .activity-info {
    background-color: #7329fe;
    padding: 60px 10px 10px 10px;
    box-shadow: 0px -4px 13px 0px rgba(0, 0, 0, 0.4);
    .board {
      margin-bottom: 70px;
    }
  }
  .tools {
    .poster {
      width: 35px;
      height: 35px;
      line-height: 35px;
      font-size: 12px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      text-align: center;
      position: fixed;
      top: 10px;
      left: 10px;
      border-radius: 50%;
      z-index: 201;
    }
  }
  footer {
    text-align: center;
    color: #fb9f20;
    font-size: 12px;
    margin-top: 10px;
  }
}
/deep/#modal-turntable {
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
      .prize {
        width: 250px;
        height: 200px;
        border: 5px solid rgba(255, 173, 32, 1);
        border-radius: 5px;
        text-align: center;
        font-size: 15px;
        .pic {
          display: block;
          width: 75px;
          height: 75px;
          background-color: #7329fe;
          border-radius: 50%;
          margin: 10px auto;
        }
        .tip {
          color: #808080;
          text-align: center;
          span {
            color: #ffad20;
          }
        }
        button {
          width: 110px;
          height: 26px;
          background: rgba(255, 173, 32, 1);
          border: none;
          outline: none;
          border-radius: 5px;
          font-size: 15px;
          padding: 0;
          margin-top: 30px;
          box-shadow: 2px 2px 0 0 #ff7f2d;
        }
      }
    }
  }
}
@keyframes startRotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1815deg);
  }
}
</style>