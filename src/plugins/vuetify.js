import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import google from '../components/google.vue'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {dark : true},
    icons: {
        iconfont: 'mdi',
        values: {
            google: {
                component: google,
            }
        }
    },
});
