import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import store from './store'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
//import routes from './routes/routes'
import router from './router'
// import router from './router'

Vue.config.productionTip = false;

const httpLink = new HttpLink({
  uri: 'https://apparent-sawfish-47.hasura.app/v1/graphql'
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

import './registerServiceWorker'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

// configure router
/*const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})
*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App),
  router,
  store
})
