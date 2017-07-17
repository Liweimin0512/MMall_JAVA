package com.mmall.service;

import com.mmall.common.ServerResponse;

import java.util.Map;

/**
 * Created by weimin on 17-7-17.
 */
public interface IOrederService {


     ServerResponse pay(Long orderNo, Integer userId, String path);
     ServerResponse aliCallback(Map<String,String> params);
     ServerResponse queryOrderPayStatus(Integer userId,Long orderNo);
}
