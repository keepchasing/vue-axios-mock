import router from '../../router/index.js'
import axios from 'axios'
import formurlencoded from 'form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const state = {
  dialog: {
    title:'',
    desc:'',
    btnTxt:'',
    btnLink:'',
    isShow: false
  },
  countDown: {
    initTxt:'获取验证码',
    sNum:90,
    lockedTxt: '重新获取(*)',
    disableClass: 'disabled',
    activeClass: 'active',
    className: 'u-count-down-btn',
    passPreCheck: false
  },
  registerJson: {
    mobile:'',
    cardNo:'',
    kaptcha: '',
    verifyCode: '',
    password: '',
    ut: '',
    checkedMobile: '',
    loginPwd: '',
    friendId: '',
    sessionId:'',
    kaptchaFile:'',
    resultInfo:'',
    reset:'',
    appDownloadUrl:localStorage.getItem('appDownloadUrl') || 'https://m.gzlex.com/helps/download-app'
  },
  errorTips:{
      phoneVerify:'',
      passwordVerify:'',
      regTip:'',
      resErrorTip:'',
      loginError:''
  },
  resType:0
}

// getters
const getters = {
  getDialog: state => state.dialog,
  getRegisterJson: state => state.registerJson,
  getCountDown: state => state.countDown,
  getErrorTips: state => state.errorTips,
  getResType:state => state.resType || localStorage.getItem('resType'),
  getAppDownUrl:state => state.registerJson.appDownloadUrl || localStorage.getItem('appDownloadUrl'),
  getRegErr :state => localStorage.getItem('resErrorTip') || '',
  getLoginErr :state => localStorage.getItem('loginError') || ''
}

// actions
const actions = {
  showState ({commit}){
    commit('showState');
  },
  initCardNo ({commit},$r){
    commit('initCardNo',$r);
  },
  verifyMobile ({ commit }){
    state.errorTips.phoneVerify = '';
    if( state.registerJson.mobile == '' || !(/^1\d{10}$/).test(state.registerJson.mobile) )
    {
      state.errorTips.phoneVerify = '请输入正确的手机号'
    }
    else
    {
      // let params = new URLSearchParams();
      // params.append('mobile',state.registerJson.checkedMobile);
      // params.append('password',state.registerJson.pwd);
      // params.append('cardNo',state.registerJson.cardNo);
      // params.append('location','/api/maojiuhuiActivity/qualification');
      // params.append('mod','post');
      // console.log(state.registerJson.cardNo)
      axios.get('/activity/universalActivity',{params:{'mobile':state.registerJson.mobile, 'cardNo':state.registerJson.cardNo,'location':'/api/maojiuhuiActivity/getUserStatus','mod':'get'}})
      .then(function (response) {
        // console.log('结果')
        // console.log(state.registerJson.cardNo)
        let  data = response.data;
        //console.log(data)
        if( data.message.code == 0 )
        {
          
          //console.log(data);
          state.dialog.btnLink = data.data.appDownloadUrl;
          commit('verifyMobile',data);
        }
        else
        {
          state.errorTips.phoneVerify = data.message.message;
        }
        
      }).catch(function(response){
        // console.log(response)
        let  data = response.data;
        state.errorTips.phoneVerify = data.message.message;
      })
    }
    
  },
  checkLogin ({ commit }){
    // console.log(state.registerJson.loginPwd.length)
    //state.registerJson.checkedMobile = localStorage.getItem('mobile');
    if( state.registerJson.loginPwd == '' )
    { 
        state.errorTips.passwordVerify = '请输入密码'
    }
    else if( state.registerJson.loginPwd.length < 6 || state.registerJson.loginPwd.length > 16 )
    {
      state.errorTips.passwordVerify = '请输入6到16位密码'
    }
    else
    {
      state.errorTips.passwordVerify = '';
      // let params = new URLSearchParams();
      // params.append('mobile',state.registerJson.mobile);
      // params.append('password',state.registerJson.loginPwd);
      // params.append('cardNo',state.registerJson.cardNo);
      // params.append('location','/api/maojiuhuiActivity/qualification');
      // params.append('mod','post');
      let {mobile,password,cardNo} = state.registerJson;
      let params = {mobile,password,cardNo};
      params.password = state.registerJson.loginPwd;
      params.mod = 'post';
      params.location = '/api/maojiuhuiActivity/qualification';
      axios.post('/activity/universalActivity',formurlencoded(params))
      .then(function (response) {
        let  data = response.data;
        // commit('checkLogin',data);
        let type = data.message.code != 0?2:1;
        localStorage.setItem('loginError',data.message.message);
        commit('setResult',type);
        router.push({ path: '/registerResult' })
      }).catch(function(response){
        let  data = response.data;
        state.errorTips.passwordVerify = data.message.message;
      })
    }
    
  },
  resetDialog ({ commit },json){
    commit('resetDialog',json);
  },
  listenCountDown({ commit,state },countDownCompenent){
    commit('setError','');
    if(state.registerJson.mobile)
    {
      if(state.registerJson.kaptcha.replace(' ',''))
      {
        // let params = new URLSearchParams();
        // params.append('uinfo',state.registerJson.mobile);
        // params.append('type', 'register');
        // params.append('kaptcha', state.registerJson.kaptcha);
        // params.append('sessionId', state.registerJson.sessionId);
        // params.append('mod', 'post');
        // params.append('location', '/vcode/maojiuhui/mobile');
        let params = {
          'uinfo':state.registerJson.mobile,
          'type': 'register',
          'kaptcha': state.registerJson.kaptcha,
          'sessionId': state.registerJson.sessionId,
          'platformId': 102,
          'mod': 'post',
          'location': '/vcode/maojiuhui/mobile'
        }
        axios.post('/activity/universalActivity',formurlencoded(params))
        .then(function(response){
          let data = response.data;
          if(data.message.code == 0)
          {
              commit('startCountDown',countDownCompenent);
          }else{
            let kaptchaTip = '';
            switch(data.message.code)
            {
              case -270:
                kaptchaTip = '图形验证码输入有误';
              break;
              case -269:
                kaptchaTip = '图形验证码已过期，点击图片重新获取';
              break;
              case -268:
                kaptchaTip = '图形验证码不存在，点击图片重新获取';
              break;
              default:
                kaptchaTip = data.message.message || '系统错误，稍后重试';
              break;
            }
            commit('setError',kaptchaTip);
          }
        })
        .catch(function(err){
         // console.log(err);
        });
      }
      else{
        commit('setError','请输入图形验证码');
        return false;
      }
    }else{
      router.push({ path: '/' })
    }
  },
  // regSubmit({ commit }){
  //   commit('checkLogin');
  // },
  getSessionId({ commit }){
    commit('goIndex',localStorage.getItem('mobile'));
    axios.get('/activity/universalActivity',{
      params:{
        mod:'get',
        location:'/api/verifyCode/sessionId'
      }
    })
    .then(function(response){
      let data = response.data;
      if(data.message.code == 0)
      {
        commit('setSessionId',data.data.sessionId);
        commit('resetKaptcha');
      }
    })
    .catch(function(err){
      // console.log(err);
    });
  },
  getStateFromStorage({ commit }){
    commit('getStateFromStorage');
  },
  resetKaptcha({ commit }){
    commit('resetKaptcha');
  },
  regSubmit({commit,state}){
    commit('setError','');
    let regTip = '';
    if(!state.registerJson.kaptcha.replace(' ',''))
    {
      regTip = '请输入图形验证码';
      commit('setError',regTip);
      return false;
    }
    if(!state.registerJson.verifyCode.replace(' ',''))
    {
      regTip = '请输入手机验证码';
      commit('setError',regTip);
      return false;
    }
    if(!(state.registerJson.password.replace(' ','') && state.registerJson.password.length >=6 && state.registerJson.password.length <= 16))
    {
      regTip = '请输入6~16位的登录密码';
      commit('setError',regTip);
      return false;
    }
    let params = Object.assign({
      mod:'post',
      location:'/user',
      mobile: '',
      cardNo: '',
      kaptcha: '',
      verifyCode: '',
      password: '',
      ut: '',
      sessionId: '',
      platformId: 102,
      source: 5
    },state.registerJson);
    // let params = new URLSearchParams();
    // for(let k in paramsJson)
    // {
    //   params.append(k,paramsJson[k]);
    // }
    axios.post('/activity/universalActivity',formurlencoded(params))
    .then(function(response){
      let type = 0;
      let data = response.data;
      if(data.message.code == 0)
      {
        type = data.haveQualifications == 1?3:4;
        commit('setResult',type);
        router.push({ path: '/registerResult' });
      }
      else{
        let kaptchaTip = '';
        switch(data.message.code)
        {
          case -270:
            kaptchaTip = '图形验证码输入有误';
          break;
          case -269:
            kaptchaTip = '图形验证码已过期，点击图片重新获取';
          break;
          case -268:
            kaptchaTip = '图形验证码不存在，点击图片重新获取';
          break;
          case -205:
          case -209:
          case -202:
          case -400:
            kaptchaTip = data.message.message;
          break;
          default:
            localStorage.setItem('resErrorTip',data.message.message);
          break;

        }
        commit('setError',kaptchaTip);
        if(!kaptchaTip)
        {
          type = 5;
          localStorage.removeItem('kaptcha');
          localStorage.removeItem('verifyCode');
          localStorage.removeItem('password');
          localStorage.removeItem('mobile');
          commit('setResult',type);
          router.push({ path: '/registerResult' });
        }
      }
    })
    .catch(function(err){
      // console.log(err);
    });
  },
  regResult({commit}){
    commit('regResult')
  },
  goIndex({commit},flag)
  {
    commit('goIndex',flag);
  }
}

// mutations
const mutations = {
  showState (state){
    //console.log(state);
  },
  initCardNo (state,$r)
  {
    // Object.assign(state.registerJson,$r.query);
    state.registerJson.cardNo = $r.query.cardNo || localStorage.getItem('cardNo') || '';
    state.registerJson.ut = $r.query.ut || localStorage.getItem('ut') || '';
    if( $r.query.reset == 1 )
    {
      state.registerJson.loginPwd = ''
    }
    state.registerJson.password = '';
    state.registerJson.kaptcha = '';
    state.registerJson.verifyCode = '';
  },
  verifyMobile (state,data){
      // 验证成功之后给checkedMobile赋值           
      state.registerJson.checkedMobile = state.registerJson.mobile;
      let flag = data.data.registered;//通过接口返回值判断手机号是否已经注册过 注册过为1
      let isGet = data.data.receiveQualification;//接口判断已注册的情况下是否领取过 领取过1

      localStorage.setItem('receiveQualification',isGet);
      localStorage.setItem('appDownloadUrl',data.data.appDownloadUrl);
      localStorage.setItem("cardNo",state.registerJson.cardNo);
      if(flag){ 
        // 出现登录弹框
        if( isGet )
        {
          //注册并已经领取
          state.dialog.title = '该手机已注册';
          state.dialog.desc = '请下载茅酒汇APP直接登录';
          state.dialog.btnTxt = '下载APP';
          state.dialog.btnLink = state.dialog.btnLink;
        }
        else
        {
          //注册并未领取
          state.dialog.title = '';
          state.dialog.desc = '';
        }
        state.dialog.isShow = true;
      }
      else
      {
        //未注册
        localStorage.setItem("mobile",state.registerJson.checkedMobile);
        localStorage.setItem("ut",state.registerJson.ut);         
        // 如果未注册 去注册页面 手机号 ut 和cardNo要拼到url上 并且把手机号存cookie cardNo存cookie 页面created的时候要去验证两个手机号是否相同
        router.push({ path: '/register' });
      }
  
    
  },
  // checkLogin (state,data)
  // {// 验证手机号密码是否匹配 checkedMobile loginPwd
  //   //验证通过跳结果页 
    
  // },
  resetDialog (state,json)
  {// 清空弹框内容
    let resetJson = {
      title:'',
      desc:'',
      btnTxt:'',
      btnLink:'',
      isShow: false
    };
    Object.assign(state.dialog,resetJson);
  },
  changePassPreCheck (state,flag)
  {
    state.countDown.passPreCheck = flag;
  },
  startCountDown (state,countDownCompenent)
  {
      countDownCompenent.countDown();
      //state.countDown.passPreCheck = false;
  },
  setSessionId (state,sessionId)
  {
      state.registerJson.sessionId = sessionId;
  },
  getStateFromStorage(state)
  {
    let {mobile,cardNo,ut} = localStorage;
    Object.assign(state.registerJson,{mobile,cardNo,ut});
  },
  resetKaptcha (state)
  {
      state.registerJson.kaptchaFile = '/activity/universalActivity?mod=get&location=%2Fapi%2FverifyCode%2Fkaptcha&sessionId='+state.registerJson.sessionId+'&timeStamp='+new Date().getTime();
  },
  regSubmit (state)
  {
    // console.log(state);
  },
  getVerifyCode (state)
  {
    // console.log(state);
  },
  setError (state,errorDesc)
  {
    state.errorTips.regTip = errorDesc;
  },
  regResult (state){
    state.registerJson.resultInfo = localStorage.getItem('resultInfo');
  },
  setResult (state,type)
  {
    if(type == 3 || type == 4)
    {
      localStorage.removeItem('cardNo');
      localStorage.removeItem('ut');
      localStorage.removeItem('mobile');
      localStorage.removeItem('resErrorTip');
    }
    if(type == 3 || type == 4 || type == 5)
    {
      state.registerJson.kaptcha = '';
      state.registerJson.verifyCode = '';
      state.registerJson.password = '';
    }
    state.resType = type;
    localStorage.setItem('resType',type);
  },
  goIndex(state,flag)
  {
    if(!flag)
    {
      router.push({ path: '/' })
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
