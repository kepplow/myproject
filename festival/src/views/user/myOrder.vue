<template>
  <div class="myOrder">
      <ul>
          <li class="item" @click="$router.push('/goodsDetails')">
              <div class="head">
                  <span>年卡会员</span>
              </div>

              <div class="details">
                  <div>已付款</div>
                  <div>￥ 100</div>
                  <div>年卡会员</div>
                  <div>购买时间：2019-12-09</div>
              </div>
          </li>
          <li class="item">
              <div class="head">
                  <span>年卡会员</span>
              </div>

              <div class="details">
                  <div>已付款</div>
                  <div>￥ 100</div>
                  <div>年卡会员</div>
                  <div>购买时间：2019-12-09</div>
              </div>
          </li>
          <li class="item">
              <div class="head">
                  <span>年卡会员</span>
              </div>

              <div class="details">
                  <div>已付款</div>
                  <div>￥ 100</div>
                  <div>年卡会员</div>
                  <div>购买时间：2019-12-09</div>
              </div>
          </li>
          <li class="item">
              <div class="head">
                  <span>年卡会员</span>
              </div>

              <div class="details">
                  <div>已付款</div>
                  <div>￥ 100</div>
                  <div>年卡会员</div>
                  <div>购买时间：2019-12-09</div>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "myOrder",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.myOrder {
    min-height: 100%;
    background-color: #F2F2F2;
    ul {
        display: inline-block;
        width: 100%;
        padding: 10px;
        list-style: none;
        li.item:nth-of-type(even) .head {
            background-image: url(../../assets/images/myOrder-card-2.png);
        }
        li.item:nth-of-type(even) .head::before {
            background-image: url(../../assets/images/myOrder-hexagon-2.png);
        }
        li.item {
            border-radius: 10px;
            background-color: #fff;
            display: flex;
            justify-items: start;
            padding: 26px 10px;
            margin-bottom: 10px;
            .head {
                position: relative;
                width: 171px;
                height: 100px;
                background: url(../../assets/images/myOrder-card-1.png) no-repeat;
                background-size: 100% 100%;
                span {
                    position: absolute;
                    left: 20px;
                    color: #fff;
                    line-height: 96px;
                    font-size: 24px;
                    font-weight: bold;
                }
            }
            .head::before {
                position: absolute;
                right: 10px;
                top: 10px;
                content: '';
                display: inline-block;
                width: 75px;
                height: 86px;
                background: url(../../assets/images/myOrder-hexagon-1.png) no-repeat;
                background-size: 100% 100%;
            }
            .details {
                div:nth-of-type(1) {
                    color: #FF4701;
                    font-size: 14px;
                    text-align: right;
                }
                div:nth-of-type(2) {
                    color: #000;
                    font-size: 14px;
                    text-align: right;
                }
                div:nth-of-type(3) {
                    color: #000;
                    font-size: 15px;
                    text-align: left;
                    margin-left: 20px;
                }
                div:nth-of-type(4) {
                    color: #808080;
                    font-size: 12px;
                    text-align: left;
                    margin-left: 20px;
                }
            }
        }
    }
}
</style>