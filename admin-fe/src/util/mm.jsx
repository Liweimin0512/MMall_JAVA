/*
* @Author: Rosen
* @Date:   2017-02-24 10:47:04
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:58:04
*/

'use strict';

const conf = {
    // online
    // serverHost: 'http://admin.happymmall.com'
    // dev
    serverHost: '',
    imageHost: 'http://img.happymmall.com/',
}

class MMUtil{
    // 请求服务器
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type       : param.method   || 'get',
                url        : param.url      || '',
                dataType   : param.type     || "json",
                data       : param.data     || null,
                success    : res => {
                    // 数据成功
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data || res.msg);
                    }
                    // 没登录状态, 且强制登录, 自动跳转到登录页
                    else if(res.status === 10){
                        this.doLogin();
                    }
                    // 其他状态，调用error
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }
    // 获取请求url地址
    getServerUrl(path){
        return conf.serverHost + path;
    }
    // 获取图片地址
    getImageUrl(path){
        return conf.imageHost + path;
    }
    // 获取url参数
    getHashParam(name){
        var reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            queryString = window.location.hash.split('?')[1] || '',
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // alert
    successTips(msg){
        alert(msg || '操作成功');
    }
    // alert
    errorTips(msg){
        alert(msg || '哪里不对了~');
    }
    // 向本地存储里放数据
    setStorage(name, data){
        // array / json
        if(typeof data === 'object'){
            let jsonString = JSON.stringify(data);
            window.localStorage.setItem(name, jsonString);
        }
        // number / string / boolean
        else if(typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean'){
            window.localStorage.setItem(name, jsonString);
        }
        // undefined / function
        else{
            alert('该数据类型不能用于本地存储');
        }
    }
    // 从本地存储获取数据
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            // JSON.parse
            return JSON.parse(data);
        }else{
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
    // 跳转登录
    doLogin(){
        window.location.href = '#/login?redirect=' + encodeURIComponent(window.location.hash);
    }
}
export default MMUtil;