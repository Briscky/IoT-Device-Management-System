package com.example.backend.service;
import com.example.backend.mapper.MessageMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.model.Device;
import com.example.backend.mapper.DeviceMapper;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    public List<Map<String, Object>> getWeekMessageCount(String name) {
        // 获取用户ID
        int id = userMapper.getUserInfo(name).getId();
        // 获取该用户的设备列表
        List<Device> deviceList = deviceMapper.getDeviceList(id);

        // 设置查询日期范围：今天和六天前
        LocalDate today = LocalDate.now();
        LocalDate sixDaysAgo = today.minusDays(6);

        // 创建一个map来存储每天的消息总数
        Map<LocalDate, Integer> dailyMessageCount = new HashMap<>();

        // 初始化这个map，每一天的消息数都设置为0
        for (LocalDate date = sixDaysAgo; !date.isAfter(today); date = date.plusDays(1)) {
            dailyMessageCount.put(date, 0);
        }

        // 遍历每个设备，累加每天的消息数量
        for (Device device : deviceList) {
            // 调用mapper方法获取每个设备在指定日期范围内的消息统计
            List<Map<String, Object>> messages = messageMapper.getWeekMessageCount(device.getName(), sixDaysAgo.toString(), today.toString());

            for (Map<String, Object> message : messages) {
                if (message.get("date") != null && message.get("count") != null) {
                    LocalDate date = ((java.sql.Date) message.get("date")).toLocalDate();
                    int count = ((Number) message.get("count")).intValue(); // 使用Number作为中间类型以避免类转换异常
                    dailyMessageCount.put(date, dailyMessageCount.getOrDefault(date, 0) + count);
                }
            }
        }

        // 转换结果为所需格式
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<LocalDate, Integer> entry : dailyMessageCount.entrySet()) {
            Map<String, Object> dayCount = new HashMap<>();
            dayCount.put("date", entry.getKey().toString());
            dayCount.put("count", entry.getValue());
            result.add(dayCount);
        }

        return result;
    }

    public List<Map<String, Integer>> getDeviceValue(String deviceName) {
        return messageMapper.getDeviceValue(deviceName);
    }

    /**
     * 获取当天不同时间当前用户各个设备发送的value
     * @param name 用户名
     * @return 不同时间各设备发送的消息数，用map列表形式存储
     */
    public Map<String, Map<String, Integer>> getTodayMessage(String name) {
        // 获取用户ID
        int id = userMapper.getUserInfo(name).getId();
        // 获取该用户的设备列表
        List<Device> deviceList = deviceMapper.getDeviceList(id);
        Map<String, Map<String, Integer>> result = new HashMap<>();

        for (Device device : deviceList) {
            String deviceName = device.getName();
            List<Map<String, Integer>> msg = getDeviceValue(deviceName);
            Map<String, Integer> map = new HashMap<>();
            for (Map<String, Integer> m : msg) {
                LocalDateTime timestamp;
                Object timestampObj = m.get("timestamp");

                timestamp = (LocalDateTime) timestampObj;
                String formattedTimestamp = timestamp.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                //String formattedTimestamp = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                int value = m.get("value");
                map.put(formattedTimestamp, value);
                //System.out.println(map);
            }
            result.put(deviceName, map);
        }
        return result;
    }

    /**
     * 获取设备的路径
     * @param selectedDevice 设备名
     * @return 路径，用map列表形式存储
     */
    public List<Map<String, Double>> getDevicePath(String selectedDevice) {
        return messageMapper.getDevicePath(selectedDevice);
    }

    /**
     * 获取设备的报警信息
     * @param selectedDevice 设备名
     * @return 报警信息，用map列表形式存储
     */
    public List<Map<String, Double>> getAlertMessage(String selectedDevice) {
        return messageMapper.getAlertMessage(selectedDevice);
    }

}
