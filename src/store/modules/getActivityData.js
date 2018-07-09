import axios from 'axios'
import wxConfig from './wxConfig'
const state = {
    gid: 29
}
const getters = {
}

const actions  = {
    getActivityData({dispatch,commit},_this){
        let url = 'https://news.jinhui365.com/activity/share';
        axios.get(url,{params:{gid: state.gid}})
        .then(function (r) {
            r = r.data;
            if(r.message.code == 0)
            {
                let shareParams = r.data.share;
                let res = {
                    "title": shareParams.title,
                    "desc": shareParams.description,
                    "imgUrl": shareParams.img_url,
                    "link": shareParams.link
                }
                commit('setActivityData',res);
                dispatch('getConfigParams',_this);
            }
        })
        .catch(function(response){
        })
    }
}

const mutations = {
    setActivityData(state,shareParams) {
        Object.assign(wxConfig.state.wxShareParams,shareParams);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
  }