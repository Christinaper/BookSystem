import service from "@/utils/service.js";

export const confirm = data => service({method: "post", url: "/order/confirm", data});

export const getList = () => service({method: "get", url: "/order/list_all"});

export const updateState = data => service({method: "post", url: "/order/updateStatus", data});

export const getAllOrder = () => service({method: "get", url: "/order/order_all"});

export const queryOrder = data => service({method: "post", url: "/order/query_order", data});
