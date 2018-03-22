/*
* @Author: Rosen
* @Date:   2017-02-24 10:35:19
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-09 23:43:37
*/

'use strict';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Product{
    
    // 获取商品信息
    getProduct(productId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/detail.do'),
            data    : {
                productId : productId || 0
            }
        });
    }
    // 获取商品信息
    getProductList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/product/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/product/search.do'),
                data    : listParam
            });
        }
            
    }
    // 获取商品信息
    saveProduct(product){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/save.do'),
            data    : product
        });
    }
    // 改变商品状态
    setProductStatus(productId, status){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/set_sale_status.do'),
            data    : {
                productId   : productId,
                status      : status
            }
        });
    }
    // 获取品类
    getCategory(parentCategoryId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/get_category.do'),
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    // 新增品类
    saveCategory(category){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/add_category.do'),
            data    : {
                parentId        : category.parentId    || 0,
                categoryName    : category.categoryName  || ''
            }
        });
    }
    // 更新品类名称
    updateCategoryName(category){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/set_category_name.do'),
            data    : category
        });
    }
}
