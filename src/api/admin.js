import service from "@/utils/service.js";

export const add = data => service({method: "post", url: "/product/add", data});
