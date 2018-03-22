/*
* @Author: Rosen
* @Date:   2017-02-28 14:53:59
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:33:03
*/


'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Product      from 'service/product.jsx';

const _mm = new MMUtile();
const _product = new Product();


const ProductDetail = React.createClass({
    getInitialState() {
        return {
            id                  : this.props.params.pId,
            firstCategoryList   : [],
            firstCategoryId     : '',
            secondCategoryList  : [],
            secondCategoryId    : '',
            name                : '',
            subtitle            : '',
            subImages           : [],
            price               : '',
            stock               : '',
            detail              : '',
            status              : ''

        };
    },
    componentDidMount: function(){
        // 初始化一级分类
        this.loadFirstCategory();
        // 初始化产品
        this.loadProduct();
    },
    // 加载一级分类
    loadFirstCategory(){
        // 查询一级品类时，不传id
        _product.getCategory().then(res => {
            this.setState({
                firstCategoryList: res
            });
        }, err => {
            alert(err.msg || '哪里不对了~');
        });
    },
    // 加载二级分类
    loadSecondCategory(){
        // 一级品类不存在时，不初始化二级分类
        if(!this.state.firstCategoryId){
            return;
        }
        // 查询一级品类时，不传id
        _product.getCategory(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList  : res,
                secondCategoryId    : this.state.secondCategoryId
            });
        }, err => {
            alert(err.msg || '哪里不对了~');
        });
    },
    // 编辑的时候，需要初始化商品信息
    loadProduct(){
        // 有id参数时，读取商品信息
        if(this.state.id){
            // 查询一级品类时，不传id
            _product.getProduct(this.state.id).then(res => {
                let product = this.productAdapter(res)
                this.setState(product);
                // 有二级分类时，load二级列表
                if(product.firstCategoryId){
                    this.loadSecondCategory();
                }
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }
    },
    // 适配接口返回的数据
    productAdapter(product){
        // 如果父品类是0（根品类），则categoryId作为一级品类
        let firstCategoryId     = product.parentCategoryId === 0 ? product.categoryId : product.parentCategoryId,
            secondCategoryId    = product.parentCategoryId === 0 ? '' : product.categoryId;
        return {
            categoryId          : product.categoryId,
            name                : product.name,
            subtitle            : product.subtitle,
            subImages           : product.subImages.split(','),
            detail              : product.detail,
            price               : product.price,
            stock               : product.stock,
            firstCategoryId     : firstCategoryId,
            secondCategoryId    : secondCategoryId,
            status              : product.status
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="商品详情"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.name}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.subtitle}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">当前状态</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.status == 1 ? '在售' : '已下架'}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-10">
                                    <select type="password" className="form-control cate-select col-md-5" value={this.state.firstCategoryId} readOnly>
                                        <option value="">请选择一级品类</option>
                                        {
                                            this.state.firstCategoryList.map((category, index) => {
                                                return (
                                                    <option value={category.id} key={index}>{category.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    {this.state.secondCategoryList.length ?  
                                        <select type="password" className="form-control cate-select col-md-5" value={this.state.secondCategoryId} readOnly>
                                            <option value="">请选择二级品类</option>
                                            {
                                                this.state.secondCategoryList.map((category, index) => {
                                                    return (
                                                        <option value={category.id} key={index}>{category.name}</option>
                                                    );
                                                })
                                            }
                                        </select> : null
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price" className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                            className="form-control" 
                                            id="price" 
                                            placeholder="价格"
                                            value={this.state.price}
                                            readOnly/>
                                        <div className="input-group-addon">元</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock" className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                            className="form-control" 
                                            id="stock"
                                            placeholder="库存" 
                                            value={this.state.stock}
                                            readOnly/>
                                        <div className="input-group-addon">件</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品图片</label>
                                <div className="img-con col-md-10">
                                    {
                                        this.state.subImages.length ? this.state.subImages.map((image, index) => {
                                            return (
                                                <div className="sub-img" key={index}>
                                                    <img className="img" src={_mm.getImageUrl(image)}/>
                                                </div>
                                            );
                                        }) : <div className="notice">没有图片</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductDetail;