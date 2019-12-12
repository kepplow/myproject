import axios from 'axios'; // 引入axios
import app from '../main'
const service = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'http://26f6x82790.wicp.vip:27640' : 'http://mkt.sccenze.cn', // api的base_url
    timeout: 5000 // request timeout
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
service.interceptors.request.use(
    request => {

        if (!localStorage.getItem('access_token')) {
            getToken()
        }
        // do something
        return request
    },    
    error => {        
        return Promise.error(error);
    }
);
// 响应拦截器
service.interceptors.response.use(response => {
    if (response.data && response.data.errcode == 42001) {
        app.$bvModal.msgBoxOk('42001 无权调用此接口或token已过期！', {
            title: '提示！',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'success',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
        })
        // getToken()
    }
    return response
}, error => {
    return Promise.reject(error)
})

function getToken () {
    axios({
        methods: 'get',
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx555ea7ed40455b7c&secret=c433cfcd08a10915dd01371f15a3d815'
    }).then(res => {
        if (res.status == 200 && res.data && res.data.access_token) {
            localStorage.setItem('access_token', res.data.access_token)
        } else {
            return Promise.error(res.data);
        }
    })
}
export default service