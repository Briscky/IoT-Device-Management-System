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

import java.time.LocalDate;
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

    @CrossOrigin
    @RequestMapping(value = "/message/user/week/{username}", method = RequestMethod.GET)
    public List<Map<String, Object>> getWeekMessageCount(@PathVariable String username) {
        return messageService.getWeekMessageCount(username);
    }

    @CrossOrigin
    @RequestMapping(value = "/message/query/values/today/{username}", method = RequestMethod.GET)
    public Map<String, Map<String, Integer>> getTodayMessage(@PathVariable String username) {
        return messageService.getTodayMessage(username);
    }

    @CrossOrigin
    @RequestMapping(value = "/message/query/path/{selectedDevice}", method = RequestMethod.GET)
    // 希望返回值格式：[{"lng": 120.1, "lat": 30.3}, {"lng": 120.2, "lat": 30.4}]
    public List<Map<String, Double>> getDevicePath(@PathVariable String selectedDevice) {
        return messageService.getDevicePath(selectedDevice);
    }

    @CrossOrigin
    @RequestMapping(value = "/message/query/alert/{selectedDevice}", method = RequestMethod.GET)
    public List<Map<String, Double>> getAlertMessage(@PathVariable String selectedDevice) {
        return messageService.getAlertMessage(selectedDevice);
    }

}
