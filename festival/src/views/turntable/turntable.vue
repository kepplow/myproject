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
            <span>{{timeDown.day}}</span> 天
            <span>{{timeDown.hours}}</span> 时
            <span>{{timeDown.minutes}}</span> 分
            <span>{{timeDown.second}}</span> 秒
          </div>
        </div>
        <div class="plate-box">
          <span
            ref="plate"
            :class="{plate: true, 'action': false}"
            :style="`transition: none;transform: rotate(${-90 - 360/rotateItems.length/2}deg);`"
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
          <span class="start" @click="getTarget"></span>
        </div>
        <b-button class="my-prize" @click="$router.push('/myPrize')">我的奖品</b-button>
      </div>
    </section>

    <section class="activity-info">
      <board v-for="(item, index) in boardItems" :key="index" :config="item"></board>
    </section>

    <footer>
      <div>
        <a :href="'tel:' + componey.value">{{componey.name}}</a>
      </div>
      <div>
        <a :href="'tel:' + contact.value">{{contact.name}}</a>
      </div>
    </footer>

    <!-- <b-container class="bottom-btn" fluid>
      <b-row>
        <b-col class="poster-btn" @click="showPoser">海报</b-col>
        <b-col class="participate-btn" @click="showForm">报名有礼</b-col>
      </b-row>
    </b-container>-->

    <section class="tools">
      <sideBtnList @click="handleClick" :config="sideBtnConfig"></sideBtnList>
      <bottom-scroll-bar v-if="bottomScrollConfig.length >= 3" :config="bottomScrollConfig"></bottom-scroll-bar>
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
            <span>{{targetName}}</span>
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
            <b-img :src="posterImg" width="200" height="300"></b-img>
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
import wx from "weixin-js-sdk";
import bannerSwiper from "../../components/bannerSwiper";
import sideBtnList from "../../components/sideBtnList";
import bottomScrollBar from "../../components/bottomScrollBar";
import board from "../../components/board";
import redPackets from "../../components/redPackets";
export default {
  name: "turntable",
  data() {
    return {
      targetName: "",
      did: null,
      timer: null,
      // 海报图片
      posterImg: "",
      // 页脚
      componey: { name: "", value: "" },
      contact: { name: "", value: "" },
      // 倒计时
      timeDown: {
        day: 8,
        hours: 0,
        minutes: 0,
        second: 0
      },
      // 红包配置
      redPacketsConfig: {
        countStop: 60
      },
      // 侧边栏配置
      sideBtnConfig: {
        music: "",
        phone: 18042119961,
        qrCode: ""
      },
      // 红包是否显示
      showRedPackets: true,
      // 富文本
      boardItems: [
        {
          header: "活动规则",
          content: ""
        },
        {
          header: "商家介绍",
          content: ""
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
        }
      ],
      // 底部滚动数据
      bottomScrollConfig: [],
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
      swiperImages: []
    };
  },
  components: {
    bannerSwiper,
    sideBtnList,
    bottomScrollBar,
    board,
    redPackets
  },
  beforeMount() {
    // 对接微信api
    let id =
      this.$route.query && this.$route.query.id ? this.$route.query.id : 0;
    this.$axios({
      method: "post",
      url: "/api/activity/userinfo/js",
      data: {
        type: 2,
        id
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
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    // 清除定时器
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    // 初始化数据
    init() {
      this.did = this.$route.query.did || null;
      wx.ready(function() {
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: "来玩啊", // 分享标题
          desc: "大转盘", // 分享描述
          link: "http://www.baidu.com", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "", // 分享图标
          success: function() {
            // 设置成功
          }
        });
      });
      this.$axios({
        method: "post",
        url: "/api/activity/dzp/dzp",
        data: {
          id: this.did
        }
      }).then(res => {
        if (res.data.code == "1000") {
          // 页脚
          this.componey = res.data.componey;
          this.contact = res.data.contact;
          let { data } = res.data;
          // 红包
          this.showRedPackets = !data.read;
          // 海报
          this.posterImg = data.posterImg;
          // 侧边栏
          this.sideBtnConfig.phone = data.bz_leader_mobile;
          this.sideBtnConfig.music = data.musicfile;
          this.sideBtnConfig.qrCode = data.qrcode;
          this.boardItems[0].content = data.content;
          // 底部滚动
          this.bottomScrollConfig = [...data.info];
          // 奖品
          this.rotateItems = [];
          data.prize.forEach(ele => {
            this.rotateItems.push({
              id: ele.id,
              name: ele.name,
              title: ele.level,
              image: ele.image
            });
          });
          this.$nextTick(() => {
            this.craetCanvas();
          });
          // 倒计时
          this.deadLine(data.endtime * 1000);
          this.swiperImages = data.images.split(",");
        }
      });
    },
    // 倒计时
    deadLine(endtime) {
      const day = 1000 * 60 * 60 * 24;
      const now = new Date().getTime();
      this.timeDown.day = (endtime - now) / day;
      this.timeDown.hours = ((endtime - now) % day) / (1000 * 60 * 60);
      this.timeDown.minutes =
        ((endtime - now) % (1000 * 60 * 60)) / (1000 * 60);
      this.timeDown.second = ((endtime - now) % (1000 * 60)) / 1000;
      for (let item in this.timeDown) {
        this.timeDown[item] = (this.timeDown[item] + "")
          .slice(0, 2)
          .replace(".", "");
      }
      this.timer = setInterval(() => {
        if (this.timeDown.second <= 0) {
          if (this.timeDown.minutes <= 0) {
            if (this.timeDown.hours <= 0) {
              this.timeDown.day--;
              this.timeDown.hours = 23;
            }
            this.timeDown.hours--;
            this.timeDown.minutes = 59;
          }
          this.timeDown.minutes--;
          this.timeDown.second = 59;
        }
        this.timeDown.second--;
        if (
          this.timeDown.second <= 0 &&
          this.timeDown.minutes <= 0 &&
          this.timeDown.hours <= 0 &&
          this.timeDown.day <= 0
        ) {
          clearInterval(this.timer);
          this.timer = null;
          this.$emit("timeEnd");
        }
      }, 1000);
    },
    // 阅读完成
    readingDone() {
      this.$axios({
        method: "post",
        url: "api/activity/dzp/read",
        data: {
          id: this.did
        }
      }).then(res => {
        if (res.data.code == "1000") {
          this.changeModal("redPackets");
          this.$bvModal.show("modal-turntable");
          this.showRedPackets = false;
        }
      });
    },
    // 生成转盘canvas
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
    // 获取到奖品
    getTarget() {
      let id = this.did;
      let targetid = null;
      this.$axios({
        method: "post",
        url: "api/activity/dzp/prize",
        data: {
          id
        }
      }).then(res => {
        if (res.data.code == "1000") {
          this.targetName = res.data.data.prize;
          targetid = res.data.data.prizeid;
          this.startRotate(targetid);
        } else if (res.data.code == "1002") {
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
    // 开始旋转
    startRotate(targetid) {
      let plate = this.$refs.plate; // 操作的圆盘
      let angle = -90 - 360 / this.rotateItems.length / 2; //初始角度
      plate.style.transition = "all 3s";
      // 查找与中奖号码相对应的旋转角度
      this.rotateItems.forEach((ele, index) => {
        if (targetid == ele.id) {
          angle += 360 * 5 - (index * 360) / this.rotateItems.length;
          plate.style.transform = `rotate(${angle}deg)`;
          return;
        }
      });
    },
    // 结束旋转
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
    // 展示海报
    showPoser() {
      this.changeModal("poster");
      this.$bvModal.show("modal-turntable");
    },
    // 展示表单
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
    a {
      color: #fb9f20;
      text-decoration: none;
    }
  }
}
/deep/#modal-turntable {
  .modal-header,
  .modal-footer {
    display: none;
  }
  .modal-dialog {
    margin: 0 !important;
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