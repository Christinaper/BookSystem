import service from "@/utils/service.js";

export const getData = (path, data) => service({method: "post", url: "/cart/" + path, data});

export const getList = () => service({method: "post", url: "/cart/list"});

export const getTotal = () => service({method: "get", url: "/cart/total"});

export const updateDate = (id, data) => service({method: "post", url: "/cart/updateDate/" + id, data});