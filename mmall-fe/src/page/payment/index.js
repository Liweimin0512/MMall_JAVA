/**
 * Created by weimin on 2017/7/14 0014.
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm           = require('util/mm.js');
var _payment      = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
    data      : {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init      : function () {
        this.onLoad();
    },
    onLoad    : function () {
        this.loadPaymentInfo();
    },
    // 加载订单 数据
    loadPaymentInfo: function () {
        var _this           = this,
            paymentHtml = '',
            $pageWrap        = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            //渲染html
            paymentHtml = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            //监听订单状态
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    listenOrderStatus:function () {
        var _this = this;
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.orderNumber,function (res) {
                if(res == true){
                    window.location.href
                        = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            },function (errMsg) {

            })
        })
    }
};
$(function () {
    page.init();
});