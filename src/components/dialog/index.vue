<template>
    <div class="m-dialog-wrapper">
        <div class="m-dialog">
            <div class="m-content">
                <div v-if="!!(title || desc)">
                    <div class="title" v-if="title">{{title}}</div>
                    <div class="desc" v-if="desc">{{desc}}</div>
                    <a :href="btnLink" class="u-dialog-btn" v-if="btnTxt">{{btnTxt}}</a>
                </div>

                <slot v-if="!(title || desc)"></slot>
            </div>
            <img src="./close.png" class="u-btn-close" @click="close">

        </div>
    </div>
</template>
<script>
export default {
  name: 'Dialog',
  data () {
      return {
          closeImg:'./close.png',
          title:'',
          desc:'',
          btnLink:'',
          btnTxt:''
      }
  },
  computed:{
  },
  props:['params'],
  methods: {
      close(){
          this.show = false;
          this.$emit('listenDialog',{isShow:false});
      }
  },
  updated(){
      this.title = this.params.title;
      this.desc = this.params.desc;
      this.btnLink = this.params.btnLink;
      this.btnTxt = this.params.btnTxt;
  },
  mounted(){
      this.title = this.params.title;
      this.desc = this.params.desc;
      this.btnLink = this.params.btnLink;
      this.btnTxt = this.params.btnTxt;
  }
}
</script>
<style scoped>
    div,h3,p,span,a,img{padding:0;margin:0;box-sizing: border-box;}
    .m-dialog-wrapper{position: fixed;z-index: 100;width:100%;height: 100%;top:0;left:0;background-color: rgba(0,0,0,0.7)}
    .m-dialog{width:80%;position: absolute;top:50%;left:50%;transform: translate(-50%,-50%);text-align:center;}
    .m-content{width:100%;background-color:#ffffff;padding:40px;color:#444;text-align: center;font-size: 32px;border-radius: 32px;line-height: 48px;}
    .title{font-size: 40px;line-height: 72px;}
    .u-dialog-btn{margin-top:32px;height: 80px;display:inline-block;line-height: 80px;color:#fff;background-color:#ff4000;border-radius: 40px;width:66.6%;text-decoration: none;}
    .u-btn-close{width: 9.4%;margin-top:40px;}
</style>

