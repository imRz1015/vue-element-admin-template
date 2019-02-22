/**
 * TANGIMING
 * 2019-2-19
 * 这里将所有调用接口的方法统一封装在了原型链上方便调用
 * this.$api.demo().then()
 */
import common from "@/api/apis/common.js";
export default {
    install(Vue) {
        let api = {
            ...common
        };
        Vue.prototype.$api = api;
        Vue.$api = api;
    }
};
