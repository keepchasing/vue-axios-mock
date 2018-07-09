<template>
    <div class="result-wrap">
        <!-- 注册成功发资格 -->
        <div class="m-result-wrap" v-if="type && type == 3">
            <span class="m-suc-bg"></span>
            <p class="m-res-title1">恭喜您注册成功</p>
            <p class="m-res-title2">购酒资格已发放到您的账户</p>
            <img src="../assets/ftQuan.png" class="m-img m-margin-self">
            <img src="../assets/bnjjQuan.png" class="m-img">
            <a :href="appDownUrl" class="u-common-btn1">下载APP</a>
        </div>
        <!-- 验证已有账号成功发资格 -->
        <div class="m-result-wrap" v-if="type && type == 1">
            <span class="m-suc-bg"></span>
            <p class="m-res-title1">恭喜您</p>
            <p class="m-res-title2">成功领取购酒资格</p>
            <img src="../assets/ftQuan.png" class="m-img m-margin-self">
            <img src="../assets/bnjjQuan.png" class="m-img">
            <a :href="appDownUrl" class="u-common-btn1">下载APP</a>
        </div>
        <!-- 资格已失效，注册成功 -->
        <div class="m-result-wrap no-img" v-if="type && type == 4">
            <span class="m-suc-bg"></span>
            <p class="m-res-title1">恭喜您</p>
            <p class="m-res-title2">注册成功</p>
            <a :href="appDownUrl" class="u-common-btn1">下载APP</a>
        </div>
        <!-- 注册失败页 -->
        <div class="m-result-wrap no-img" v-if="type && type == 5">
            <span class="m-error-bg"></span>
            <p class="m-res-title1">{{regErr || '注册失败'}}</p>
            <p class="m-res-title2">客服电话：4008577669</p>
            <router-link to="/" class="u-common-btn2">重试</router-link>
        </div>
        <!-- 已有账户验证失败页 -->
        <div class="m-result-wrap no-img" v-if="type && type == 2">
            <span class="m-error-bg"></span>
            <p class="m-res-title1">{{loginErr || '验证失败'}}</p>
            <p class="m-res-title2">客服电话：4008577669</p>
            <router-link to="/?reset=1" class="u-common-btn2">重试</router-link>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  computed:mapGetters({
    type: 'getResType',
    appDownUrl: 'getAppDownUrl',
    regErr: 'getRegErr',
    loginErr: 'getLoginErr'
  }),
  created(){
    this.$store.dispatch('goIndex',localStorage.getItem('resType'));
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$color1:#cccccc;
h1, h2 {
  font-weight: normal;
}
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
  text-decoration: none
}
.result-wrap{height:100%;width:100%;}
.no-img{transform: translate(-50%,-90%);left:50%;top:50%;position: absolute;width:100%;}
.no-img .m-error-bg,.no-img .m-suc-bg{margin-top:0;}
p{margin:0;padding:0;}
hr{border: 0;border-bottom: 2px solid $color1;}
.m-suc-bg{margin-top:70px;background:url(../assets/sucBg.jpg) no-repeat;background-size:100%;width:201px;height:202px;display:inline-block;}
.m-error-bg{margin-top:250px;background:url(../assets/errorBg.jpg) no-repeat;background-size:100%;width:201px;height:202px;display:inline-block;}

.m-result-wrap{text-align:center;}
.m-res-title1{font-size:40px;margin:28px 0 20px 0;}
.m-res-title2{font-size:24px;}
.u-common-btn1{margin-top:50px;width:80%;height:100px;display:inline-block;background:#ff4000;color:#fff;text-align:center;border-radius:75px;line-height:100px;font-size:30px;}
.u-common-btn2{margin-top:50px;width:80%;height:100px;display:inline-block;background:#66de1e;color:#fff;text-align:center;border-radius:75px;line-height:100px;font-size:30px;}

.m-img{width:85%}
.m-margin-self{margin:60px 0 30px 0;}
</style>
