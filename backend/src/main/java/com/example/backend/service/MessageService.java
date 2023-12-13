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

import java.time.LocalDate;
import java.util.*;

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

    /**
     * 获取当前用户的所有设备的一周内每天发送消息总数
     * @param name 用户名
     * @return 每天发送的消息数，用map列表形式存储
     */
    public List<Map<LocalDate, Integer>> getWeekMessageCount(String name) {
        int id = userMapper.getUserInfo(name).getId();
        List<Device> deviceList = deviceMapper.getDeviceList(id);

        LocalDate today = LocalDate.now();
        LocalDate sixDaysAgo = today.minusDays(6);

        Map<LocalDate, Integer> dailyMessageCount = new HashMap<>();

        for (LocalDate date = sixDaysAgo; !date.isAfter(today); date = date.plusDays(1)) {
            dailyMessageCount.put(date, 0);
        }

        for (Device device : deviceList) {
            List<Map<String, Object>> messages = messageMapper.getWeekMessageCount(device.getName(), sixDaysAgo.toString(), today.toString());

            for (Map<String, Object> message : messages) {
                LocalDate date = LocalDate.parse((String) message.get("date"));
                int count = (Integer) message.get("count");
                dailyMessageCount.put(date, dailyMessageCount.get(date) + count);
            }
        }

        // 转换为所需格式
        List<Map<LocalDate, Integer>> result = new ArrayList<>();
        for (Map.Entry<LocalDate, Integer> entry : dailyMessageCount.entrySet()) {
            Map<LocalDate, Integer> dayCount = new HashMap<>();
            dayCount.put(entry.getKey(), entry.getValue());
            result.add(dayCount);
        }

        return result;
    }


}
