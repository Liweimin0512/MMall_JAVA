/*
* @Author: Rosen
* @Date:   2017-04-04 20:03:01
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-05 23:32:40
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Order        from 'service/order.jsx';

import './detail.scss';

const _mm           = new MMUtile();
const _order        = new Order();


const OrderDetail = React.createClass({
    getInitialState() {
        return {
            orderNumber: this.props.params.orderNumber,
            orderInfo : {}
        };
    },
    componentDidMount: function(){
        // 初始化产品
        this.loadOrderDetail();
    },
    // 加载detail信息
    loadOrderDetail(){
        _order.getOrderDetail(this.state.orderNumber).then(res => {
            this.setState({
                orderInfo: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    onSendGoods(){
        if(confirm('是否确认该订单已发货？')){
            _order.sendGoods(this.state.orderNumber).then(res => {
                this.loadOrderDetail();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    },
    render() {
        let productList     = this.state.orderInfo.orderItemVoList  || [],
            receiverInfo    = this.state.orderInfo.shippingVo       || {}
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="订单详情"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">订单号：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderInfo.orderNo}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">创建时间：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderInfo.createTime}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">收件人：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">
                                        {this.state.orderInfo.receiverName}，
                                        {receiverInfo.receiverProvince} 
                                        {receiverInfo.receiverCity}，
                                        {receiverInfo.receiverAddress}，
                                        {receiverInfo.receiverPhone}
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">订单状态：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">
                                        {this.state.orderInfo.statusDesc}
                                        {
                                            this.state.orderInfo.status == 20 
                                                ? <a className="btn btn-sm btn-default btn-send-goods" onClick={this.onSendGoods}>立即发货</a>
                                                : null
                                        }   
                                        
                                    </p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">支付方式：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">订单金额：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">￥{this.state.orderInfo.payment}</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th width="15%">商品图片</th>
                                            <th width="40%">商品信息</th>
                                            <th width="15%">单价</th>
                                            <th width="15%">数量</th>
                                            <th width="15%">合计</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productList.map((product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img className="p-img" src={this.state.orderInfo.imageHost + product.productImage} alt={product.productName}/>
                                                        </td>
                                                        <td>{product.productName}</td>
                                                        <td>￥{product.currentUnitPrice}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>￥{product.totalPrice}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default OrderDetail;