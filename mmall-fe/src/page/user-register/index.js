/**
 * Created by 24102 on 2017/6/13.
 */

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');


// 表单错误提示
var formError = {
    show:function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide:function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};
// page 逻辑部分
var page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent:function () {
        var _this = this;
        // 验证username
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            //异步验证用户名是否存在
            if(!username){
                return;
            }
            _user.checkUsername(username,function (res) {
                formError.hide();
            },function (errMsg) {
                formError.show(errMsg);
            });
        });
        // 注册按钮点击事件
        $('#submit').click(function () {
            _this.submit();
        });
        //如果按下回车页，进行提交
        $('.user-content').keyup(function(e){
            if(e.keyCode===13){
                _this.submit();
            }
        })
    },
    //提交表单
    submit:function () {
        var formData = {
                username           :$.trim($('#username').val()),
                password           :$.trim($('#password').val()),
                passwordConfirm    :$.trim($('#password-confirm').val()),
                phone              :$.trim($('#phone').val()),
                email              :$.trim($('#email').val()),
                question           :$.trim($('#question').val()),
                answer             :$.trim($('#answer').val())
            },
            //表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            //提交
            _user.register(formData,function (res) {
                window.location.href = './result.html?type=register';
            },function (errMsg) {
                formError.show(errMsg);
            });
        }else{
            //失败，错误提示
            formError.show(validateResult.msg);
        }
    },
    formValidate:function (formData) {
        var result = {
            status:false,
            msg:''
        };
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //密码不能太短
        if(formData.password.length < 6){
            result.msg = '密码不能少于6字符';
            return result;
        }
        //两次密码是否一致
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次密码不一致';
            return result;
        }
        //验证手机号
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        //验证邮箱
        if(!_mm.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        //密码提示问题
        if(!_mm.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        //密码提示问题答案
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function () {
    page.init();
});