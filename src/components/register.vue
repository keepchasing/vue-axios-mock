<template>
  <div class="m-register-wrap">
    <div class="tipEl">
      <div class="regTip" v-show="errorTip.regTip">{{errorTip.regTip}}</div>
    </div>
    <ul class="m-reg-form">
      <!-- <li>
        <input type="text" v-model="registerJson.mobile">
      </li>
      <li><input type="text" v-model="registerJson.cardNo"></li>
      <li><input type="text" v-model="registerJson.ut"></li>
      <li><input type="text" v-model="registerJson.sessionId"></li> -->
      <li class="m-clear">
        <div class="width400 fl"><span class="tile tile1"></span> <input type="text" placeholder="请输入图形验证码" v-model="registerJson.kaptcha"></div>
        <div class="width180 fr"><img v-if="registerJson.sessionId" :src="registerJson.kaptchaFile" alt="图形验证码" class="kaptcha" @click="resetKaptcha" ref="elKaptcha"></div>
      </li>
      <li class="m-relative m-clear"><span class="tile tile2"></span><input type="text" placeholder="请输入手机验证码" v-model="registerJson.verifyCode"><count-down :params="countDownJson" @listenCountDown="listenCountDown" class="u-count-down-btn"/></li>
      <li><span class="tile tile3"></span><input type="password" placeholder="设置6-16位登录密码" v-model="registerJson.password"></li>
      <li><span @click="regSubmit" class="regSubmit">立即注册</span></li>
    </ul>
    
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import countDown from './countDown.vue'
export default {
  components:{
    countDown
  },
  computed:mapGetters({
    errorTip: 'getErrorTips',
    registerJson: 'getRegisterJson',
    countDownJson: 'getCountDown'
  }),  
  methods: mapActions([
    'listenCountDown',
    'regSubmit',
    'resetKaptcha',
    'regSubmit'
  ]),
  created(){
    this.$store.dispatch('showState');
    // 获取sessionId
    this.$store.dispatch('getSessionId');
    // 从localStorage获取手机号码
    this.$store.dispatch('getStateFromStorage');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  *{padding:0;margin: 0;box-sizing: border-box;}
  input,a{-webkit-tap-highlight-color:rgba(255, 255, 255, 0);}

  .fr{float: right;}
  .fl{float: left;}
  .m-relative{position: relative;}
  ul,li{list-style: none;}
  input{outline:none }
  .m-register-wrap{width:100%;height:100%;background:url(../assets/regBg.jpg) no-repeat center 54px;background-size:240px 296px;padding-top:360px;}

  .m-reg-form{width:80%;padding:0 0 60px;margin:24px auto 0;font-size: 30px;color:#444;}
  .m-reg-form li{margin-bottom:44px;width:100%;height: 100px;position: relative;}
  
  .m-reg-form input{padding-left:98px;height: 100%;width:100%;border:1Px solid #cccccc;border-radius: 50px;font-size:30px;padding-right:20Px;}
  .u-count-down-btn{position: absolute; right:10px;top:50%;transform: translate(0,-50%);}

  .m-reg-form .width400{width: 66.8%;height: 100px;}
  .m-reg-form .width180{width: 33.2%;padding-left:20Px;height: 100px;}
  .m-reg-form img{height: 100%;width: 100%;}
  .m-clear{clear: both;}
  .tile{height: 36px;width:36px;position: absolute;left:50px;top:50%;transform: translate(0,-50%);background:url(../assets/regTiles.png) no-repeat center;background-size: 100% auto;}
  .tile1{background-position: 0 0;}
  .tile2{background-position: 0 -50px;}
  .tile3{background-position: 0 -96px;}
  .tile4{background-position: 0 -140px}

  .m-reg-form .regSubmit{height: 100%;width:100%;line-height:100px;text-align:center;border-radius:50px;display:inline-block;padding:0;background-color:#ff4000;color:#ffffff;border:none;}
  .tipEl{height: 60px;}
  .regTip{height: 60px;line-height: 60px;font-size: 24px;color: #ff4000;text-align: center;}
</style>
