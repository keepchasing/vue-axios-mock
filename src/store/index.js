import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import wxConfig from './modules/wxConfig'
import getActivityData from './modules/getActivityData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    index,
    wxConfig,
    getActivityData
  }
})
