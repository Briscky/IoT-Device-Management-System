package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
//import com.example.backend.utils.RedisUtils;
//import com.example.backend.utils.TokenCenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
public class UserController {
    @Autowired
    UserService userService;

    //@Autowired
    //RedisUtils redisUtils;

    @CrossOrigin
    @RequestMapping(value = "/user/config/password", method = RequestMethod.POST)
    public int configPassword(@RequestBody Map<String, Object> form) {
        return userService.configPassword(form);
    }

    @CrossOrigin
    @RequestMapping(value = "/user/verify-password", method = RequestMethod.POST)
    public int verifyPassword(@RequestBody Map<String, Object> form) {
        return userService.verifyPassword(form);
    }

    @CrossOrigin
    @RequestMapping(value = "/user/config/email", method = RequestMethod.POST)
    public int configEmail(@RequestBody Map<String, Object> form) {
        return userService.configEmail(form);
    }


    @CrossOrigin
    @RequestMapping(value = "/user/{name}", method = RequestMethod.GET)
    public User getUser(@PathVariable String name) {
        return userService.getUserInfo(name);
    }

    @RequestMapping(value = "/user/register", method = RequestMethod.POST)
    public int userRegister(@RequestBody Map<String, Object> form) {
        return userService.registerUser(form);
    }

    @CrossOrigin
    @RequestMapping(value = "/user/login", method = RequestMethod.POST)
    public Map<String,String> userLogin(@RequestBody Map<String, Object> form) {
        int re = userService.loginUser(form);
        Map<String, String> map = new HashMap<>();
        if(re == 1) {
            //String token = TokenCenter.createToken(form.get("name").toString());
            //redisUtils.set(form.get("name").toString(), token);
            //map.put("token", token);
            map.put("token", Jwts.builder().setSubject(form.get("name").toString()).signWith(SignatureAlgorithm.HS256, form.get("password").toString()).compact());
            map.put("code", "1");
            map.put("name", form.get("name").toString());
        } else if(re == -1) {
            map.put("code", "-1");
        } else if(re == -2) {
            map.put("code", "-2");
        }
        return map;
    }
}