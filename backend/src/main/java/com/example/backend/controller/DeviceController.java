package com.example.backend.controller;
import com.example.backend.model.Device;
import com.example.backend.service.DeviceService;

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
public class DeviceController {
    @Autowired
    DeviceService deviceService;

    @CrossOrigin
    @RequestMapping(value = "/device/query/list/{name}", method = RequestMethod.GET)
    public List<Device> getDeviceList(@PathVariable String name) {
        return deviceService.getDeviceList(name);
    }

    @RequestMapping(value = "/device/add", method = RequestMethod.POST)
    public int addNewDevice(@RequestBody Map<String, Object> map) {
        return deviceService.addNewDevice(map);
    }

    @RequestMapping(value = "/device/edit", method = RequestMethod.POST)
    public int editDevice(@RequestBody Map<String, Object> map) {
        return deviceService.editDevice(map);
    }
}