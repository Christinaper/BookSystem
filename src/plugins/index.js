import Alert from './Alert';
import Confirm from './Confirm';
import Notice from './Notice';

// 以$开头
export default {
    install: function(Vue) {
        Vue.prototype.$Alert = Alert;
        Vue.prototype.$Confirm = Confirm;
        Vue.prototype.$Notice = Notice;
    }
}
