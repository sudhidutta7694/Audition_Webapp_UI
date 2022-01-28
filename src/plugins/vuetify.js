import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import glug from '../components/glug.vue'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {dark : true},
    icons: {
        iconfont: 'mdi',
        values: {
            glug: {
                component: glug,
            }
        }
    },
});
