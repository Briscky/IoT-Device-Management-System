package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    public User getUserInfo(String name) {
        return userMapper.getUserInfo(name);
    }

    /**
     * 注册用户时候的api
     * @param form 注册用户时提交的表单，用map形式存储json数据
     * @return 1表示注册成功，-1表示用户名已注册，-2表示邮箱已注册
     */
    public int registerUser(Map<String, Object> form) {
        // 首先要判断这个新注册的用户名是否已经存在，已经存在则不能注册
        if (userMapper.checkName(form.get("name").toString()) != null) {
            return -1;
        } else if (userMapper.checkEmail(form.get("email").toString()) != null) {
            return -2;
        } else {
            return userMapper.registerUser(form);
        }
    }

    /**
     * 用户登录时候的api
     * @param form 登录用户时提交的表单，用map形式存储json数据
     * @return 1表示登录成功，-1表示用户名或邮箱不存在，-2表示密码错误
     */
    public int loginUser(Map<String, Object> form) {
        boolean existence = userMapper.checkName(form.get("name").toString()) != null || userMapper.checkEmail((String)form.get("email").toString()) != null;
        boolean passwordVerify = userMapper.name_passwordCheck(form) != null || userMapper.email_passwordCheck(form) != null;
        if (!existence) {
            return -1;
        } else if (!passwordVerify) {
            return -2;
        } else {
            return 1;
        }
    }

    /**
     * 用户修改邮箱时候的api
     * @param form 修改邮箱时提交的表单，用map形式存储json数据
     * @return 1表示修改成功，-1表示该邮箱已被注册
     */
    public int configEmail(Map<String, Object> form) {
        if (userMapper.checkEmail(form.get("email").toString()) != null){
            return -1;
        }
        else
            return userMapper.configEmail(form);
    }

    /**
     * 用户验证旧密码时候的api
     * @param form 验证旧密码时提交的表单，用map形式存储json数据
     * @return 1表示旧密码正确，-1表示不正确
     */
    public int verifyPassword(Map<String, Object> form) {
        boolean passwordVerify = (userMapper.name_passwordCheck(form) != null);
        if (!passwordVerify) {
            return -1;
        } else {
            return 1;
        }
    }

    /**
     * 用户修改密码时候的api
     * @param form 修改密码时提交的表单，用map形式存储json数据
     * @return 1表示修改成功，否则表示修改失败
     */
    public int configPassword(Map<String, Object> form) {
        return userMapper.configPassword(form);
    }
}
