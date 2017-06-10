package com.mmall.service.impl;

import com.mmall.common.Const;
import com.mmall.common.ServerResponse;
import com.mmall.common.TokenCache;
import com.mmall.dao.UserMapper;
import com.mmall.pojo.User;
import com.mmall.service.IUserService;
import com.mmall.util.MD5Util;
import com.sun.corba.se.spi.activation.Server;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * Created by 24102 on 2017/6/10.
 */
@Service("iUserService")
public class UserServiceImpl implements IUserService{
    @Autowired
    private UserMapper userMapper;
    @Override
    public ServerResponse<User> login(String username, String password){
        int resultCount = userMapper.checkUsername(username);
        if (resultCount == 0){
            return ServerResponse.creatByErrorMessage("用户名不存在");
        }

        String md5Password = MD5Util.MD5EncodeUtf8(password);
        User user = userMapper.selectLogin(username,md5Password);
        if (null==user){
            return ServerResponse.creatByErrorMessage("密码错误");
        }

        user.setPassword(StringUtils.EMPTY);
        return ServerResponse.creatBySuccess("登陆成功",user);

    }


    public ServerResponse<String> register(User user){
        //用户名和email是否存在
        ServerResponse validResponse = this.checkValid(user.getUsername(),Const.USERNAME);
        if (!validResponse.isSuccess()){
            return validResponse;
        }
        validResponse = this.checkValid(user.getEmail(),Const.EMAIL);
        if (!validResponse.isSuccess()){
            return validResponse;
        }
        user.setRole(Const.Role.ROLE_CUSTOMER);
        //MD5加密
        user.setPassword(MD5Util.MD5EncodeUtf8(user.getPassword()));
        int resultCount = userMapper.insert(user);
        if (0==resultCount){
            return ServerResponse.creatByErrorMessage("注册失败");
        }
        return ServerResponse.creatBySuccessMessage("注册成功");
    }

    public ServerResponse<String> checkValid(String str,String type){
        if (org.apache.commons.lang3.StringUtils.isNoneBlank(type)){
            //开始校验
            if (Const.USERNAME.equals(type)){
                int resultCount = userMapper.checkUsername(str);
                if (resultCount > 0){
                    return ServerResponse.creatByErrorMessage("用户名已存在");
                }
            }
            if (Const.EMAIL.equals(type)){
                int resultCount = userMapper.checkEmail(str);
                if (resultCount > 0){
                    return ServerResponse.creatByErrorMessage("emaill已存在");
                }
            }
        }else{
            return ServerResponse.creatByErrorMessage("参数错误");
        }
        return ServerResponse.creatBySuccessMessage("校验成功");
    }

    public ServerResponse selectQuestion(String username){
        ServerResponse validResponse = this.checkValid(username,Const.USERNAME);
        if (validResponse.isSuccess()){
            return ServerResponse.creatByError().creatByErrorMessage("用户不存在");
        }
        String question = userMapper.selectQuestionByUsername(username);
        if (StringUtils.isNoneBlank(question)){
            return ServerResponse.creatByError().creatBySuccess(question);
        }
        return ServerResponse.creatByErrorMessage("找回密码的问题是空的");
    }

    public ServerResponse<String> checkAnswer(String username,String question,String answer){
        int resultCount = userMapper.checkAnswer(username,question,answer);
        if (resultCount>0){
            //说明问题及问题答案是这个用户的，并且是正确的
            String forgetToken = UUID.randomUUID().toString();
            TokenCache.setKey(TokenCache.TOKEN_PREFIX+username,forgetToken);
            return ServerResponse.creatBySuccess(forgetToken);
        }
        return ServerResponse.creatByErrorMessage("问题的答案错误");
    }

    public ServerResponse<String> forgetResetPassword(String username,String passwordNew,String forgetToken){
        if (StringUtils.isBlank(forgetToken)){
            return ServerResponse.creatByErrorMessage("参数错误，token需要传递");
        }
        ServerResponse validResponse = this.checkValid(username,Const.USERNAME);
        if (validResponse.isSuccess()){
            //用户不存在
            return ServerResponse.creatByErrorMessage("用户不存在");
        }

        String token = TokenCache.getKey(TokenCache.TOKEN_PREFIX+username);
        if (StringUtils.isBlank(token)){
            return ServerResponse.creatByErrorMessage("token无效或者过期");
        }
        if (StringUtils.equals(forgetToken,token)){
            String md5Password = MD5Util.MD5EncodeUtf8(passwordNew);
            int rowCount = userMapper.updatePasswordByUsername(username,md5Password);
            if (rowCount > 0){
                return ServerResponse.creatBySuccessMessage("修改密码成功");
            }
        }else{
            return ServerResponse.creatByErrorMessage("token错误，请重新获取重置密码的token");
        }
        return ServerResponse.creatByErrorMessage("修改密码失败");
    }

    public ServerResponse<String> resetPassword(String passwordOld,String passwordNew,User user){
        //防止横向越权,校验一下用户旧密码，查询count（1）不指定id，结果就是true
        int resultCount = userMapper.checkPassword(MD5Util.MD5EncodeUtf8(passwordOld),user.getId());
        if (0==resultCount){
            return ServerResponse.creatByErrorMessage("旧密码错误");
        }

        user.setPassword(MD5Util.MD5EncodeUtf8(passwordNew));
        int updateCount = userMapper.updateByPrimaryKeySelective(user);
        if (updateCount >0){
            return ServerResponse.creatBySuccessMessage("密码更新成功");
        }
        return ServerResponse.creatByErrorMessage("密码更新失败");

    }
}
