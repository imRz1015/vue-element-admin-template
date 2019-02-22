const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    //权限相关
    roles: state => state.user.roles,
    permission_routers: state => state.permission.routers,
    // 这个是vuex的，动态路由
    addRouters: state => state.permission.addRouters
};
export default getters;
