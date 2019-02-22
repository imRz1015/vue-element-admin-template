import Vue from "vue";
import Router from "vue-router";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index"),
        hidden: true
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404"),
        hidden: true
    },

    {
        path: "/",
        component: Layout,
        redirect: "/dashboard-index",
        name: "dashboard",
        meta: {
            title: "总览",
            icon: "link"
        },
        // hidden: true,
        children: [
            {
                path: "/dashboard-index",
                name: "dashboard-index",
                meta: {
                    title: "首页",
                    icon: "link"
                },
                component: () => import("@/views/dashboard/index")
            }
        ]
    }
];
export const asyncRouter = [
    {
        path: "/example",
        component: Layout,
        redirect: "/table",
        name: "Example",
        meta: {title: "例子", icon: "example", pid: 1000100},
        children: [
            {
                path: "/table",
                name: "Table",
                meta: {title: "Table", icon: "table", pid: 1000101},
                component: () => import("@/views/table/index")
            },
            {
                path: "/tree",
                name: "Tree",
                meta: {title: "树形结构", icon: "tree", pid: 1000102},
                component: () => import("@/views/tree/index")
            }
        ]
    },

    {
        name: "form",
        path: "/form",
        component: Layout,
        meta: {
            pid: 1000200
        },
        children: [
            {
                path: "/form-index",
                name: "Form-index",
                component: () => import("@/views/form/index"),
                meta: {title: "表单", icon: "form", id: 1000201}
            }
        ]
    },

    {
        path: "/nested",
        component: Layout,
        redirect: "/menu1",
        name: "Nested",
        meta: {
            title: "Nested",
            icon: "nested",
            pid: 1000300
        },
        children: [
            {
                path: "/menu1",
                component: () => import("@/views/nested/menu1/index"), // Parent router-view
                name: "Menu1",
                meta: {title: "Menu1", pid: 1000310},
                children: [
                    {
                        path: "/menu1-1",
                        component: () => import("@/views/nested/menu1/menu1-1"),
                        name: "Menu1-1",
                        meta: {title: "Menu1-1", pid: 1000311}
                    },
                    {
                        path: "/menu1-2",
                        component: () => import("@/views/nested/menu1/menu1-2"),
                        name: "Menu1-2",
                        meta: {title: "Menu1-2", pid: 1000312}
                    },
                    {
                        path: "/menu1-3",
                        component: () => import("@/views/nested/menu1/menu1-3"),
                        name: "Menu1-3",
                        meta: {title: "Menu1-3", pid: 1000313}
                    }
                ]
            },
            {
                path: "/menu2",
                name: "Menu2",
                component: () => import("@/views/nested/menu2/index"),
                meta: {title: "menu2", pid: 1000320}
            }
        ]
    },
    {path: "*", redirect: "/404", hidden: true}
];
export default new Router({
    // mode: "history", //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});
