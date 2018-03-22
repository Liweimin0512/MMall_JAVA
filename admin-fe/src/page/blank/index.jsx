/*
* @Author: Rosen
* @Date:   2017-03-11 10:11:47
* @Last Modified by:   Rosen
* @Last Modified time: 2017-03-11 10:24:24
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import Product      from 'service/product.jsx'
const _product  = new Product();

const ProductCategory = React.createClass({
    getInitialState() {
        return {
            
        };
    },
    componentDidMount: function(){
        
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="品类管理">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/product.category/add">
                            <i className="fa fa-plus fa-fw"></i>
                            <span>Button</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        Blank page
                    </div>
                </div>
            </div>
        );
    }
});

export default ProductCategory;
