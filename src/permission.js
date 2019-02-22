import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import {Message} from "element-ui";
import {getToken} from "@/utils/auth"; // 验权

const whiteList = ["/login", "/"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (getToken()) {
        //已登录后不能再访问登录页面
        if (to.path === "/login") {
            next({path: "/"});
            NProgress.done();
        } else {
            if (store.getters.roles.length === 0) {
                store.commit(
                    "SET_ROLES",
                    JSON.parse(sessionStorage.getItem("menuInfos"))
                );
                store
                    .dispatch("GenerateRoutes", store.getters.roles)
                    .then(() => {
                        // 根据roles权限生成可访问的路由表
                        // 这里是动态路由
                        // console.log(JSON.stringify(store.getters.addRouters));
                        // console.log(store.getters.addRouters);
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next({...to, replace: true}); // hack方法 确保addRoutes已完成
                    });
            } else {
                next();
            }
        }
    } else {
        // 否则全部重定向到登录页
        if (to.path === "/login") {
            next();
        } else {
            next({path: "/login"});
        }
        NProgress.done();
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});
