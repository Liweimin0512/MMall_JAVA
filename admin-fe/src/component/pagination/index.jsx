/*
* @Author: Rosen
* @Date:   2017-02-28 11:40:05
* @Last Modified by:   Rosen
* @Last Modified time: 2017-02-28 11:55:19
*/

'use strict';

import React        from 'react';
import ReactDOM     from 'react-dom';

import RcPagination from 'rc-pagination';

import './index.scss';

// 通用分页组件
const Pagination = React.createClass({
    getInitialState() {
        return {
            
        };
    },
    render() {
        return (
            <RcPagination {...this.props}/>
        )           
    }
});

export default Pagination;