/*
* @Author: Rosen
* @Date:   2017-02-11 19:03:26
* @Last Modified by:   Rosen
* @Last Modified time: 2017-02-12 11:36:24
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

const User = React.createClass({
    getInitialState() {
        return {
            hello: 'User did mount'
        };
    },
    componentDidMount: function(){
       console.log('User did mount');
    },
    render() {
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">用户管理</h1>
                    </div>
                </div>
                {this.state.hello}
            </div>
        );
    }
});

export default User;
