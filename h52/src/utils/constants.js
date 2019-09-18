// const __API_SERVER__ = '/tpaper/';  // 测试
// const __API_SERVER__ = 'http://47.99.79.11:8081/';  // 生产
const __API_SERVER__ = '/'; // 生产

export default {
    SERVER_URL: process.env.NODE_ENV === 'production' && __API_SERVER__ ? __API_SERVER__ : '/',
    // mock/
    MEDIA_URL: process.env.NODE_ENV === 'production' && __API_SERVER__ ? __API_SERVER__ : 'http://172.16.1.182:8081/',
    AVATAR_URL: (process.env.NODE_ENV === 'production' && __API_SERVER__ ? __API_SERVER__ : '/') + 'user/avatar/',

    TOKEN_STR: 'nnnnn',

    UNLOGIN_STATUS: 10012,

    PAGESIZE: 10,
}