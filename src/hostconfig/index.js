
const apiHost = {};


if (process.env.ENV === 'dev') {
    apiHost.netImg = 'http://sit-backstage.allcitygo.com/';
    // apiHost.netImg = 'https://luckydrawbackstage.allcitygo.com:9005/';
    // apiHost.nethost = 'http://10.0.0.105:9020/';
    // apiHost.nethost = 'http://sit-backstage.allcitygo.com/';
    apiHost.nethost = 'http://sit-basic-gw.allcitygo.com/luckydraw/';
}
if (process.env.ENV === 'test') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'beta') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'v5') {
    apiHost.nethost = 'http://sit-operation.allcitygo.com:9109/';
}
if (process.env.ENV === 'release') {
    apiHost.netImg = 'https://luckydrawbackstage.allcitygo.com:9005/';
    apiHost.nethost = 'https://bmapi.allcitygo.com:13002/luckydraw/';
}


export default apiHost;
