package com.mmall.dao;

import com.mmall.pojo.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProductMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);

    List<Product> selectList();
    List<Product> selectByNameAndProductId(@Param("productNmae")String productName,@Param("productId") Integer productId);

    List<Product> selectByNameAndCategoryId(@Param("productNmae")String productName,@Param("categoryIdList") List<Integer> categoryIdList);
}