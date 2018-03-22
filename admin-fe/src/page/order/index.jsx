/*
* @Author: Rosen
* @Date:   2017-02-11 19:03:18
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-05 23:22:47
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Order        from 'service/order.jsx';

const _mm = new MMUtile();
const _order = new Order();

// import './index.scss';

const OrderList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list', // list / search
            orderNumber     : '',
            pageNum         : 1,
            pages           : 0
        };
    },
    componentDidMount(){
       this.loadOrderList();
    },
    // 加载产品列表
    loadOrderList(){
        let listParam       = {};
        listParam.listType  = this.state.listType;
        listParam.pageNum   = this.state.pageNum;
        // 按商品名搜索
        if(this.state.listType ==='search'){
            listParam.orderNo = this.state.orderNumber;
        }
        // 查询
        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    // 关键词变化
    onOederNumberChange(e){
        let orderNumber = e.target.value.trim();
        this.setState({
            orderNumber : orderNumber
        });
    },
    // 搜索
    onSearch(){
        if(this.state.orderNumber){
            // setState是异步的
            this.setState({
                listType    : 'search',
                pageNum     : 1
            }, () => {
                this.loadOrderList();
            });
        }else{
            // setState是异步的
            this.setState({
                listType    : 'list',
                pageNum     : 1
            }, () => {
                this.loadOrderList();
            });
        }
            
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.setState({
            pageNum     : pageNum
        }, () => {
            this.loadOrderList();
        });
    },
    
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="订单管理"/>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control">
                                    <option value="orderNumber">按订单号查询</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="订单号" onChange={this.onOederNumberChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>订单号</th>
                                    <th>收件人</th>
                                    <th>订单状态</th>
                                    <th>订单总价</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((order, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Link className="opear" to={ '/order/detail/' + order.orderNo}>{order.orderNo}</Link>
                                                </td>
                                                <td>{order.receiverName}</td>
                                                <td>{order.statusDesc}</td>
                                                <td>￥{order.payment}</td>
                                                <td>{order.createTime}</td>
                                                <td>
                                                    <Link className="opear" to={ '/order/detail/' + order.orderNo}>查看</Link>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="6" className="text-center">没有找到相应结果~</td>
                                        </tr>
                                    )
                                }
                                            
                            </tbody>
                        </table>
                    </div>
                    {
                    this.state.pages > 1 ? <Pagination onChange={this.onPageNumChange} 
                        current={this.state.pageNum} 
                        total={this.state.total} 
                        showLessItems/>: null
                    }
                </div>
            </div>
        );
    }
});

export default OrderList;