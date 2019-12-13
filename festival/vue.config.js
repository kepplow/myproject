module.exports = {
    devServer: {
        proxy: {
            'http://wx.sccenze.cn': {
              target: 'http://wx.sccenze.cn',
              ws: true,
              secure: true,
              changeOrigin: true,
              // pathRewrite: {
              //   '^http://api.weixin.qq.com': ''
              // }
            }
        }
    }
}