import Vue from 'vue';
import VueI18n from 'vue-i18n';

/**
 * Load validate.js on the window to make it availble to Vue
 * components so we can re-use our existing schemas.
 * Open to doing this in a different way.
 */
window.validate = require('validate.js');

/**
 * Load VueI18n library and our existing Sails locale files.
 */
Vue.use(VueI18n);

const messages = {
  en: require('../../config/locales/en.json'),
  fr: require('../../config/locales/fr.json')
};

const i18n = new VueI18n({
  locale: 'en',
  messages,
});

/**
 * Automatically register our Vue components.  Recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
const files = require.context('./', true, /\.vue$/i);
files.keys().map(key =>
  Vue.component(
    key
      .split('/')
      .pop()
      .split('.')[0],
    files(key).default,
  ),
);

if (document.getElementById('app')) {
  new Vue({ i18n, el: '#app' });
}
