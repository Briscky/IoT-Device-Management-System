package com.example.backend.controller;
import com.example.backend.model.Message;
import com.example.backend.service.DeviceService;

import com.example.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // 允许前端发起跨域请求
@RestController
public class MessageController {
    @Autowired
    MessageService messageService;

    @CrossOrigin
    @RequestMapping(value = "/message/user/all/{username}", method = RequestMethod.GET)
    public int getTotalMessageCount(@PathVariable String username) {
        return messageService.getTotalMessageCount(username);
    }

}
