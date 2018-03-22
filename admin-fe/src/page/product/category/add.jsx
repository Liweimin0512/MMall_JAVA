/*
* @Author: Rosen
* @Date:   2017-02-15 20:34:22
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-04 19:46:28
*/
'use strict';

import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import Product      from 'service/product.jsx'

const _product = new Product();

const ProductCategoryAdd = React.createClass({
    getInitialState() {
        return {
            pageName        : '所属品类',
            parentId        : 0,  // 所属品类
            categoryName    : '', // 品类名称
            categoryList    : []  // 品类集合
        };
    },
    componentDidMount: function(){
        // 查询一级品类时，不传id
        _product.getCategory().then(res => {
            this.setState({
                categoryList: res
            });
        }, errMsg => {
            alert(errMsg);
        });
    },
    onValueChange(e){
        let name   = e.target.name;
        this.setState({
            [name] : e.target.value
        });
    },
    onSubmit(e){
        e.preventDefault();
        if(!this.state.categoryName){
            alert('请输入品类名称');
            return;
        }
        // 请求接口
        _product.saveCategory({
            parentId      : this.state.parentId,
            categoryName    : this.state.categoryName
        }).then(res => {
            alert('商品添加成功');
            window.location.href='#/product.category/index';
        }, errMsg => {
            alert(errMsg);
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="品类管理 -- 添加品类"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <form className="form-horizontal" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="col-md-2 control-label">{this.state.pageName}</label>
                                <div className="col-md-10">
                                    <select className="form-control cate-select" name="parentId" onChange={this.onValueChange}>
                                        <option value="0">/所有</option>
                                        {
                                            this.state.categoryList.map(function(category, index) {
                                                return (
                                                    <option value={category.id} key={index}>/所有/{category.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category-name" className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-3">
                                    <input type="text" 
                                        className="form-control" 
                                        id="category-name" 
                                        name="categoryName"
                                        autoComplete="off"
                                        placeholder="请输入品类名称"
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-xl btn-primary">提交</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductCategoryAdd;