import service from "@/utils/service.js";

export const getData = data => service({method: "post", url: "/product/list", data});

export const getDetail = path => service({method: "get", url: "/product/model/" + path });

export const remove = id => service({method: "get", url: "/product/remove/" + id });