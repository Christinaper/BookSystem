// 创建函数并导出
// 调用本函数（MIAlert）
import Vue from "vue";
import ComponentConfig  from "./Notice.vue"; // 导入米组件的配置

export default function miNotice(text) {
        // 组件的对象配置变成一个可以new的构造函数
        const ComponentConstructor = Vue.extend(ComponentConfig)
        // new构造函数创建指定的组件的实例,并传参,并挂载得到组件实例
        const instance = new ComponentConstructor({data: {text: text}}).$mount();
        // 找到这个组件实例的$el对应的真实dom节点插入到body中
        document.body.appendChild(instance.$el)
}