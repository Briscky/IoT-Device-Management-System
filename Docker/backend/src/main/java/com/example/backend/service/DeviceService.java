package com.example.backend.service;
import com.example.backend.mapper.UserMapper;
import com.example.backend.model.Device;
import com.example.backend.mapper.DeviceMapper;
import com.example.backend.model.User;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@Service
public class DeviceService {
    @Autowired
    DeviceMapper deviceMapper;

    @Autowired
    UserMapper userMapper;

    /**
     * 获取当前用户的所有设备的列表
     * @param name 用户名
     * @return 设备列表
     */
    public List<Device> getDeviceList(String name) {
        int id = userMapper.getUserInfo(name).getId();
        return deviceMapper.getDeviceList(id);
    }

    /**
     * 创建新的设备
     * @param form 设备所需的表单
     * @return 1表示创建成功, 0表示设备名已存在
     */
    public int addNewDevice(Map<String, Object> form) {
        if (deviceMapper.getDevice((String) form.get("name")) != null) {
            return 0;
        }
        User user = userMapper.getUserInfo(form.get("username").toString());
        form.put("userid", user.getId());
        if(deviceMapper.addNewDevice(form) != 0)
            return 1;
        else
            return 0;
    }

    /**
     * 编辑设备
     * @param form 设备所需的表单
     * @return 1表示编辑成功, 0表示编辑失败
     */
    public int editDevice(Map<String, Object> form) {
        User user = userMapper.getUserInfo(form.get("username").toString());
        form.put("userid", user.getId());


        // 检查form中是否包含type字段
        if(form.containsKey("type")) {
            // 尝试将type字段的值转换为整数
            try {
                int typeInt = Integer.parseInt(form.get("type").toString());
                form.put("type", typeInt);
            } catch(NumberFormatException e) {
                // 处理转换错误
                System.out.println("Type conversion error: " + e.getMessage());
                // 可以选择抛出异常或返回错误代码
            }
        }
        //System.out.println(form);
        return deviceMapper.editDevice(form);
    }

    /**
     * 获取当前用户的所有设备的数目
     * @param name 用户名
     * @return 设备总数
     */
    public int getDeviceCount(String name) {
        int id = userMapper.getUserInfo(name).getId();
        return deviceMapper.getDeviceList(id).size();
    }

    /**
     * 获取当前用户的所有激活设备的数目
     * @param name 用户名
     * @return 激活设备总数
     */
    public int getActiveDeviceCount(String name) {
        int id = userMapper.getUserInfo(name).getId();
        return deviceMapper.getActiveDeviceList(id).size();
    }

    /**
     * 获取当前用户的所有设备的类型分布
     * @param name 用户名
     * @return 设备类型分布
     */
    public List<Map<String, Object>> getDeviceTypeDistribution(String name) {
        int id = userMapper.getUserInfo(name).getId();
        List<Map<String, Object>> result =  deviceMapper.getDeviceTypeDistribution(id);
        String[] types = {"基础", "车载", "健康和医疗", "家庭", "未知"};
        for (Map<String, Object> map : result) {
            int type = (int) map.get("kind");
            map.put("kind", types[type - 1]);
        }
        return result;
    }
}
