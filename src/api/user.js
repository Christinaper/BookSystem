import service from "@/utils/service.js";

export const loginByPwd = data => service({method: "post", url: "/user/login_pwd", data});

export const register = data => service({method: "post", url: "/user/register", data});

export const update = data => service({method: "post", url: "/user/update", data});

export const allUpdate = data => service({method: "post", url: "/user/allUpdate", data});