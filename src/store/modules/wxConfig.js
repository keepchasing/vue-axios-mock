import router from '../../router/index.js'
import wx from 'weixin-js-sdk'
import axios from 'axios'
import formurlencoded from 'form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const state = {
    wxConfParams: {
        signature: '', //签名
        nonceStr: '', //随机字符串
        appId:'',
        timestamp: ''
    },
    wxShareParams: {
        title: '',
		link: '',
		desc: '',
		imgUrl: ''
    }

}

const getters = {
}

const actions  = {
    getConfigParams({commit},_this){
        if(!state.wxShareParams.title)
        {
            return false;
        }
        let url = 'https://wx.gzlex.com/jsajax.php?url='+location.href.split('#')[0];
        axios.get(url,{params:{}})
        .then(function (r) {
            r = r.data;
            let res = {
                "appId": r.appId,
                "nonceStr": r.nonceStr,
                "timestamp": r.timestamp,
                "signature": r.signature
            }
            commit('configParams',res)
            let params = Object.assign({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            },state.wxConfParams);
            wx.config(params);
            wx.error(function(res){
            });
            wx.ready(function() {
                wx.checkJsApi({
                    jsApiList: [
                        'getNetworkType',
                        'previewImage'
                    ],
                    success: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });
                let shardate = Object.assign({
                    trigger: function(res) {
    
                    },
                    success: function(res) {
                    },
                    cancel: function(res) {
    
                    },
                    fail: function(res) {
    
                    }
                }, state.wxShareParams);
                wx.onMenuShareTimeline(shardate);		//朋友圈
                wx.onMenuShareAppMessage(shardate);	    //好友
            });
        })
        .catch(function(response){
        })
    }
}

const mutations = {
    configParams(state,subParams) {
        Object.assign(state.wxConfParams,subParams);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
  }