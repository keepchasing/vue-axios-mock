// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
const getParamJson = (url) => {
    let paramJson = {};
    if(url){
        let paramArr = url.split('?')[1].split('&');
        for(let val of paramArr){
            let [key,value] = val.split('=');
            paramJson[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    }
    return paramJson;
}
// mock一组数据
const getData = function(req) {
    let params = req.body? getParamJson('?' + req.body): getParamJson(req.url)
    let result = {};
    switch(params.location){
        case '/api/maojiuhuiActivity/getUserStatus': // 检查手机号是否已注册
            result = {
                'message': {
                'code': Random.natural(0, 1),
                'message': '服务器错误，请稍后重试'
                },
                'data':{
                    'registered': Random.natural(0, 1),
                    'receiveQualification': Random.natural(0, 1),
                    'appDownloadUrl': 'https:\/\/m.gzlex.com\/helps\/download-app'
                }
            }
        break;
        case '/vcode/maojiuhui/mobile': //获取验证码 校验图形验证码
            result = {
                "message": {
                    "code":0,
                    "message":""
                },
                "userId":"",
                "token":""
            }
        break;
        case '/user': // 注册接口
            result = {"message":{"code":Random.natural(0, 1),"message":"服务器错误，请稍后重试"}}
        break;
        case '/api/maojiuhuiActivity/qualification': //   登录验证接口
            result = {"message":{"code":Random.natural(0, 1),"message":"服务器错误，请稍后重试"}};
        break;
    }
    return result;
}

Mock.mock(/\/activity\/universalActivity(|\?\S*)$/, /get|post/i, getData);