/*
* @Author: Rosen
* @Date:   2017-02-24 15:49:17
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:59:59
*/

'use strict';

import MMUtil from 'util/mm.jsx';

const mm = new MMUtil();

export default class User{
    // 检查用于登录的信息是否合法
    checkLoginInfo(userInfo){
        if(!userInfo.username){
            return {
                state: false,
                msg: '用户名不能为空'
            }
        }
        if(!userInfo.password){
            return {
                state: false,
                msg: '密码不能为空'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    }
    // 登录
    login(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/login.do'),
            method  : 'POST',
            data    : {
                username : userInfo.username || '',
                password : userInfo.password || ''
            }
        });
    }
    // 退出登录
    logout(){
        return mm.request({
            url     : mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
        });
    }
}