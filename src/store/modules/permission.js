import {asyncRouter, constantRouterMap} from "@/router";

/**
 * 通过meta.pid判断是否与当前用户权限匹配
 * @param menuInfos
 * @param route
 */
function hasPermission(roles, route) {
    //如果没有meta或者没有pid，则说明为通用路由，不需要权限,如login，404
    if (route.meta && route.meta.pid) {
        return roles.some(role => role === route.meta.pid);
    } else {
        return true;
    }
}

/**
 * 将所有权限表的pid遍历出来，用于权限判断
 * @param roles Array
 */
function handleRolesToPidArray(roles = []) {
    let res = [];
    roles.forEach(val => {
        if (val.pid) {
            if (val.children && val.children.length) {
                res.push(...handleRolesToPidArray(val.children));
            }
            res.push(val.pid);
        }
    });
    return res;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouter
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
    // 递归过滤异步路由表，返回符合用户角色权限的路由表
    // 这里是我们筛选的路由，即最后生成的菜单路由
    const res = [];
    routes.forEach(route => {
        const tmp = {...route};
        // tmp为单个路由配置信息
        if (hasPermission(roles, tmp)) {
            if (tmp.children && tmp.children.length) {
                tmp.children = filterAsyncRouter(tmp.children, roles);
            }
            res.push(tmp);
        }
    });
    return res;
}

const permission = {
    state: {
        //动态添加完成后，结果路由，包含了不需要权限的路由
        routers: [],
        //动态计算后，用户拥有访问权限的路由
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            // 真正渲染路由的地方
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
            console.log(state.addRouters, state.routers)
        }
    },
    actions: {
        // 这里是一个action，是一个异步
        GenerateRoutes({commit}, data) {
            return new Promise(resolve => {
                let roles = data;
                // asyncRouter为我们定义路由数组。roles是powerid的list
                roles = handleRolesToPidArray(data);
                let accessedRouters = filterAsyncRouter(asyncRouter, roles);
                commit("SET_ROUTERS", accessedRouters);
                resolve();
            });
        }
    }
};

export default permission;
