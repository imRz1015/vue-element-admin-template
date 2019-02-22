import Service from "../Service";

export default {
    login(data) {
        return Service.post("/bc_plat/login", data);
    },
    register(data) {
        return Service.post('/bc_plat/register', data);
    }
};
