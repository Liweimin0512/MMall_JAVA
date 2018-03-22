/*
* @Author: Rosen
* @Date:   2016-11-06 12:39:33
* @Last Modified by:   Rosen
* @Last Modified time: 2017-02-15 21:14:25
*/
'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';

import PageTitle    from 'component/page-title/index.jsx';

const Home = React.createClass({
    getInitialState() {
        return {
            hello: 'Welcome'
        };
    },
    componentDidMount: function(){
       console.log('Home did mount');
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Home"/>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        Welcome
                    </div>
                </div>
            </div>
        );
    }
});

export default Home;
