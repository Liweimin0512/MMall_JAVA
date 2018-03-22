/*
* @Author: Rosen
* @Date:   2017-02-18 10:47:31
* @Last Modified by:   Rosen
* @Last Modified time: 2017-03-02 13:14:47
*/

'use strict';

import React        from 'react';
import ReactDOM     from 'react-dom';
import Simditor     from 'simditor';

import MMUtile from 'util/mm.jsx';

const _mm = new MMUtile();

import './index.scss';

const RichEditor = React.createClass({
    getInitialState() {
        return {
            
        };
    },
    componentDidMount(){
        this.loadEditor();
    },
    loadEditor(){
        this.textarea  = this.refs['textarea'];
        this.editor = new Simditor({
            textarea: $(this.textarea),
            defaultValue: this.props.placeholder,
            upload:{
                url             : _mm.getServerUrl('/manage/product/richtext_img_upload.do'),
                defaultImage    : '',
                fileKey         :'upload_file'
            }
        });
        // bind event
        this.bindEditorEvent();
    },
    bindEditorEvent(){
        this.editor.on('valuechanged', e => {
            this.props.onValueChange(this.editor.getValue());
        })
    },
    setValue(value){
        this.editor.setValue(value);
    },
    render() {
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )           
    }
});

export default RichEditor;