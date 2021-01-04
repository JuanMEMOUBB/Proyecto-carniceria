import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentProducto: {
      id: '',
      name: '',
      quantity: 0,
      precioTotal: 0
    },
    shoppingCart: [],
    cartTotalPrice: 0,
    cartTotalWeight: 0
    
  },
  getters:{
    getCurrentProducto: state => state.currentProducto,
    getShoppingCart: state => state.shoppingCart,
    getCartTotalPrice: state => state.cartTotalPrice,
    getTotalQuantity: state => state.cartTotalWeight

  },
  mutations: { //syncrono
    setCurrentProducto(state,payload){
      state.currentProducto.id = payload.id;
      state.currentProducto.name = payload.nombre;
      state.currentProducto.quantity = payload.cant;
      state.currentProducto.precioTotal = payload.cant * payload.precio;

      let productoInCart = state.shoppingCart.find(producto => {
        return producto.id === payload.id
      })
      if(productoInCart){
        productoInCart.cant += payload.cant;
      }else{
        state.shoppingCart.push(payload);
      }
    },

    setCartTotalPrice(state,payload){
      state.cartTotalPrice += payload;
    },

    setCartTotalWeight(state,payload){
      state.cartTotalWeight += payload;
    },

    removeProductFromCart(state,payload){
      state.cartTotalPrice -= payload.cant * payload.precio;
      state.cartTotalWeight -= payload.cant;
      state.shoppingCart = state.shoppingCart.filter(producto => {
        return producto.id !== payload.id;
      })
    },

    clearCart(state){
      state.shoppingCart = [];
      state.cartTotalPrice = 0;
      state.cartTotalWeight = 0;
    }

  },
  actions: { //asyncrono

    async setCartTotalPrice(state,payload){
      state.commit("setCartTotalPrice",payload);
    },

    async setCartTotalWeight(state,payload){
      state.commit("setCartTotalWeight",payload);
    },

    async removeProductFromCart(state,payload){
      state.commit("removeProductFromCart",payload);
    },

    async clearCart(state){
      state.commit("clearCart");
    }

  }
})
