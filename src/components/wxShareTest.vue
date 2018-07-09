<template>
  <div class="m-guide-wrap">
      <div class="m-guide-bg">
          <div class="m-mobile-wrap">
              <p class="m-mobile-con"><i class="u-phone-icon"></i><input type="text" placeholder="请输入您的手机号码" v-model="registerJson.mobile" name="mobile"></p>
              <input type="hidden" v-model="registerJson.cardNo" name="cardNo">
              <input type="hidden" v-model="registerJson.ut" name="ut">
              <p class="u-error-tip">{{errorTips.phoneVerify}}</p>
              <span class="u-common-btn1" @click="verifyMobile">下一步</span>
              <p class="m-desc-con">*茅酒汇由贵州白酒交易所官方运营*</p>
          </div>
      </div>
      <Dialog :params="dialog" @listenDialog="resetDialog" v-show="dialog.isShow">
          <div class="tmpl">
            <!-- <input type="text"  v-model="registerJson.checkedMobile" > -->
            <div class="ta-center">
              <p class="m-title1">该手机号已注册</p>
              <p class="m-title2">请输入登录密码进行验证</p>
              <input class="u-input" type="password" placeholder="输入6-16位登录密码" v-model="registerJson.loginPwd" >
            </div>
            <hr>
            <p class="u-error-tip">{{errorTips.passwordVerify}}</p>
            <span class="u-common-btn1" @click="checkLogin">提交</span>
            <p class="m-desc-con">*如已有金汇账户*<br>
              请直接输入金汇账户登录密码登录</p>
          </div>
      </Dialog>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Dialog from './dialog/index.vue'
export default {
    components:{
      Dialog
    },
    computed:mapGetters({
      registerJson: 'getRegisterJson',
      dialog: 'getDialog',
      errorTips: 'getErrorTips',
      gid: 'getGid'
    }),  
    methods: mapActions([
      'verifyMobile',// 查验手机号码是否注册
      'checkLogin',
      'resetDialog'
    ]),
    created(){
      //获取cardNo
      let _this = this;
      this.$store.dispatch('initCardNo',_this.$route);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$color1:#cccccc;
h1, h2 {
  font-weight: normal;
}
input{outline:none }
input,a{-webkit-tap-highlight-color:rgba(255, 255, 255, 0);}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: $color1;
}
p{margin:0;padding:0;}
hr{border: 0;border-bottom: 2px solid $color1;}
.m-guide-wrap{width:100%;}
.m-guide-bg{background:url(../assets/guideBg.jpg) no-repeat;height:auto;background-size:contain;}
.m-mobile-wrap{padding-top:110%;text-align:center;}
.m-mobile-wrap input{padding-left:12%;width:67%;height:100px;border-radius:75px;line-height:100px;border:1Px solid $color1;font-size:30px;}
.u-error-tip{padding:0 0 3% 0;margin:0;font-size:25px;color:#ff4000}
.u-common-btn1{width:80%;height:100px;display:inline-block;background:#ff4000;color:#fff;text-align:center;border-radius:75px;line-height:100px;font-size:30px;}

// .m-mobile-wrap input{width:590px;height:98px;border-radius:10px;}
.m-desc-con{color:#888;margin-top:40px;font-size:24px;}
.m-mobile-con{position:relative;}
.u-phone-icon{position:absolute;display:inline-block;background:url(../assets/phoneIcon.png) no-repeat;background-size:100%;width:28px;height:40px;left:15%;top:29%}
.m-title1{font-size:40px;margin-top:30px;}
.m-title2{font-size:30px;margin:20px 0 40px 0;}
.u-input{border:none;text-align:center;}
.ta-center{text-align:center;}
</style>
