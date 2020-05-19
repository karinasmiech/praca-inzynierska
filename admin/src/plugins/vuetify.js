import Vue from 'vue';
import Vuetify from 'vuetify';
import { pl } from 'vuetify/es5/locale';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opts = {
    lang: {
        locales: { pl },
        current: 'pl',
    },
};

export default new Vuetify(opts);
