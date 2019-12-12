module.exports = {
    devServer: {
        proxy: {
            'http://mkt.sccenze.cn': {
              target: 'http://mkt.sccenze.cn',
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