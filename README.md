## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目需求：

1.  通过二维码扫描进入引导页，输入手机号 验证是否注册（二维码链接上带有购酒资格码，且该码只能绑定一次）

2.  已注册，出现带密码输入框弹框，验证登录，如购酒资格未使用，绑定购酒资格

3.  未注册，注册后根据购酒资格是否可用送购酒资格


## 本项目技术点：

1. mockjs----模拟服务器响应，完成前端数据调试

2. vuex----管理状态

3. axios----接口请求数据

4. px2rem----将样式中的px转为rem


## 项目封装组件：

1.  弹框组件

    +   支持纯内容/内容+按钮/自定义弹框内所有内容(输入手机号点击下一步通过模拟数据会出现两种弹框)


2.  获取验证码倒计时组件

    +   支持倒数时间自定义

    +   高亮文案内容自定义

    +   不可点击状态文案自定义
