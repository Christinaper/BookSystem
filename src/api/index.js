// export default导出的写法
import * as category from './category.js'
import * as product from './product.js'
import * as user from './user.js'
import * as cart from './cart.js'
import * as address from './address.js'
import * as order from './order.js'
import * as admin from './admin.js'

export default {
    install: function(Vue) {
        Vue.prototype.$api = { category, product, user, cart, address, order, admin };
    }
}
