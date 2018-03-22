/*
* @Author: Rosen
* @Date:   2017-02-23 18:16:59
* @Last Modified by:   Rosen
* @Last Modified time: 2017-02-24 10:17:27
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import {Link}       from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

const ErrorPage = React.createClass({
    getInitialState() {
        return {
            
        };
    },
    componentDidMount: function(){
       console.log('ErrorPage did mount');
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="出错啦~"/>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <Link to="/">点我返回首页</Link>
                    </div>
                </div>
            </div>
        );
    }
});

export default ErrorPage;
