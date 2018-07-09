const Mock = require('mockjs');
const resMap = {
    userStatus:[
        {
            'message': {
            'code': 0,
            'message': 'success'
            },
            'data':{
                'registered': 1,
                'receiveQualification': 1,
                'appDownloadUrl': 'https:\/\/m.gzlex.com\/helps\/download-app'
            }
        },
        {
            'message': {
            'code': 0,
            'message': 'success'
            },
            'data':{
                'registered': 0,
                'receiveQualification': 0,
                'appDownloadUrl': 'https:\/\/m.gzlex.com\/helps\/download-app'
            }
        },
        {
            'message': {
            'code': 1,
            'message': '服务器错误，请稍后重试'
            },
            'data':{
                'registered': 1,
                'receiveQualification': 1,
                'appDownloadUrl': 'https:\/\/m.gzlex.com\/helps\/download-app'
            }
        }
    ]
}
export default resMap;