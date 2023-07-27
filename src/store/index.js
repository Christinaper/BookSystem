import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            // 在localStorage中保存userInfo状态
            // key: 'ProfileView',
            paths: ['userInfo', 'addressList']
        })
    ],
    state: {
        userInfo: {},
        addressList: []
    },
    mutations: {
        setUserInfo(state, userInfo) { // 用于设置userInfo状态
            state.userInfo = userInfo;
        },
        setAddressList(state, addressList) {
            state.addressList = addressList;
        }
    },
    actions: {
        async getUserInfo({commit}) { // 获取用户信息
            const response = await Vue.prototype.$api.address.getInfo(); // 发送API请求
            const userInfo = response; // 获取返回的数据
            commit('setUserInfo', userInfo); // 调用mutation设置userInfo状态
        },
        async getAddressList({commit}) {
            const response = await Vue.prototype.$api.address.getData();
            const addressList = response;
            commit('setAddressList', addressList);
        },
        async setDefaultAddress({commit}, id) {
            await Vue.prototype.$api.address.setDefault(id);
            const list = await Vue.prototype.$api.address.getData();
            commit('setAddressList', list)
        }
    } 
});
