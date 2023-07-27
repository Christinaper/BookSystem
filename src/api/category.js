import service from "@/utils/service.js";

export const getAll = () => service({url: "/category/all"})

export const getData = fid => service({url: "/category/list/" + fid});