<template>
    <div :class="countParams.className+ ' m-count-wrapper '+ (countParams.locked?countParams.disableClass:countParams.activeClass)" @click="checkCountEnv">
        <div>{{(countParams.locked)?(countParams.lockedTxt.replace('*',countParams.currentNum)):countParams.initTxt}}</div>
    </div>
</template>
<script>
export default {
  name: 'countDown',
  data () {
      return {
          countParams:{
            initTxt: '获取验证码',
            lockedTxt: '重新获取(*)',
            sNum: 5,
            disableClass: 'disabled',
            activeClass: 'active',
            className: '',
            locked: false,
            currentNum: 5,
            countTimer: null
          },
            passPreCheckFlag: true
      }
  },
  computed:{
  },
  props:['params'],
  methods: {
      checkCountEnv() {
          if(!this.countParams.locked)
          {
            let _this = this;
            this.$emit('listenCountDown',_this);
          }else{
              return false;
          }
      },
      countDown(){
          if(!this.countParams.locked)
          {
            this.countParams.locked = true;
            this.countParams.currentNum = this.countParams.sNum;
            clearInterval(this.countParams.countTimer);
            this.countParams.countTimer = setInterval(()=>{
                if(this.countParams.currentNum <= 1)
                {
                    this.countParams.locked = false;
                    clearInterval(this.countParams.countTimer);
                    return false;
                }
                this.countParams.currentNum--;
            },1000);
          }else{
              return false;
          }
      }
  },
  updated(){
  },
  mounted(){
      Object.assign(this.countParams,this.params);
  }
}
</script>
<style scoped>
    .m-count-wrapper{width:200px;height: 80px;line-height: 80px;color:#fff;text-align: center;font-size: 30px;border-radius:40px;}
    .m-count-wrapper.active{background-color: #ff4000;cursor: pointer;}
    .m-count-wrapper.disabled{background-color: #cccccc;}
</style>

