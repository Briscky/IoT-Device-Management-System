package com.example.backend.service;
import com.example.backend.mapper.MessageMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.model.Device;
import com.example.backend.model.Message;
import com.example.backend.mapper.DeviceMapper;
import com.example.backend.model.User;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.Optional;
@Service
public class MessageService {
    @Autowired
    MessageMapper messageMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    DeviceMapper deviceMapper;

    /**
     * 获取当前用户的所有设备的收到消息总数
     * @param name 用户名
     * @return 消息总数
     */
    public int getTotalMessageCount(String name) {
        int id = userMapper.getUserInfo(name).getId();
        List<Device> deviceList = deviceMapper.getDeviceList(id);
        int totalMessageCount = 0;
        for (Device device : deviceList) {
            totalMessageCount += messageMapper.getTodayMessageList(device.getName()).size();
        }
        return totalMessageCount;
    }
}
