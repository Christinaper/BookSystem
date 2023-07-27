import service from "@/utils/service.js";

export const getData = () => service({method: "get", url: "/address/list"});

export const setDefault = id => service({url: "/address/set_default/" + id});

export const getDefault = () => service({url: "/address/get_default"});

export const add = data => service({method: "post", url: "/address/add", data})

export const getModel = id => service({method: "get", url: "/address/model/" + id})

export const update = data => service({method: "post", url: "/address/update", data})

export const getInfo = () => service({method: "get", url: "/address/user_info"})
