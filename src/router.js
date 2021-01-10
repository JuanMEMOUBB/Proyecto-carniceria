import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DetallePedido from './views/DetallePedido.vue'
import ClienteView from './views/ClienteView.vue'
import AddCliente from './components/AddCliente.vue'
import MiPedido from './views/MiPedido.vue'
import CarritoCompra from './components/CarritoCompra.vue'
import Login from './components/Login.vue'
import { authGuard } from "./auth";

import DashboardLayout from 'src/layout/DashboardLayout.vue'
import DashboardLayoutClient from 'src/layout/DashboardLayoutClient.vue'
// GeneralViews
import NotFound from 'src/pages/NotFoundPage.vue'
import GuestView from './layout/GuestView.vue'

// Admin pages
import Prueba from 'src/pages/Prueba.vue'
import Tienda from 'src/pages/Tienda.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import ClientesTable from 'src/pages/ClientesTable.vue'
import Typography from 'src/pages/Typography.vue'
import ProductosTable from 'src/pages/ProductosTable.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Pedidos from './views/Pedidos.vue'

//Client pages
import  PedidoCliente from 'src/pages/PedidoCliente.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'guest',
      component: GuestView,
      redirect: '/home',
        children: [
          {
            path: 'home',
            name: 'Home',
            component: Home
          },
          {
            path: 'tienda',
            name: 'Tienda',
            component: Notifications
          },
          {
            path: 'icons',
            name: 'Icons',
            component: Icons
          },
        ]
    },
    /*{
      path: '/',
      name: 'home',
      component: DashboardLayout
    },*/
    /*{
      path: "/login",
      name: "login",
      component: Login
    },
   /* {
        path: '/',
        component: DashboardLayout,
        redirect: '/admin/overview'
    },*/
    {   path: '/cliente',
        name: 'clienteView',
        component: DashboardLayoutClient,
        redirect: '/cliente/home',
        beforeEnter: authGuard,
        children: [
          {
            path: 'home',
            name: 'Home',
            component: Home
          },
          {
          path: 'user',
            name: 'User',
            component: UserProfile
          },
          {
            path: 'upgrade',
            name: 'Upgrade to PRO',
            component: PedidoCliente
          },
          {
            path: 'tienda',
            name: 'Tienda',
            component: Notifications
          },
          {
            path: 'icons',
            name: 'Icons',
            component: Icons
          },
          {
            path: 'carrito',
            name: 'carrito',
            component: MiPedido  
          },
        ]
      },
    {
        path: '/admin',
        name: 'adminView',
        component: DashboardLayout,
        redirect: '/admin/home',
        children: [
          {
            path: 'home',
            name: 'Home',
            component: Home
          },
          {
            path: 'user',
            name: 'User',
            component: UserProfile
          },
          {
            path: 'clientes',
            name: 'Clientes',
            component: ClientesTable
          },
          {
            path: 'typography',
            name: 'Typography',
            component: ProductosTable
          },
          {
            path: 'icons',
            name: 'Icons',
            component: Icons
          },
          {
            path: 'tienda',
            name: 'Tienda',
            component: Notifications
          },
          {
            path: 'prueba',
            name: 'Prueba',
            component: Prueba
          },
          {
            path: 'maps',
            name: 'Maps',
            component: Maps
          },
          {
            path: 'notifications',
            name: 'Notifications',
            component: Notifications
          },
          {
            path: 'upgrade',
            name: 'Upgrade to PRO',
            component: Pedidos
          },
          {
            path: 'carrito',
            name: 'carrito',
            component: MiPedido  
          },
          {
            path: 'carritoCompra',
            name: 'carritoCompra',
            component: CarritoCompra  
          }
        ]
      },
      { path: '*', component: NotFound },
    {
      path: '/detallePedido/:id',
      name: 'DetallePedido',
      component: DetallePedido,
      props: true
    },
    {
      path: '/miPedido',
      name: 'MiPedido',
      component: MiPedido
    },

    {
      path: '/clientes',
      name: 'clienteView',
      component: ClienteView
    },

    {
      path: '/addCliente',
      name: 'AddCliente',
      component: AddCliente
    },

    {
      path: '/nuevoProducto',
      name: 'nuevoProducto',
      component: () => import(/* webpackChunkName: "about" */ './views/NuevoProducto.vue')
    },

    {
      path: '/pedidos',
      name: 'pedidos',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Pedidos.vue')
    }
  ]
})
