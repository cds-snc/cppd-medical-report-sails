import Vue from 'vue'

/**
 * Automatically register your Vue components.  Recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key =>
  Vue.component(
    key
      .split('/')
      .pop()
      .split('.')[0],
    files(key).default,
  ),
)

if (document.getElementById("app")) {
  new Vue({
    el: '#app',
  })
}
