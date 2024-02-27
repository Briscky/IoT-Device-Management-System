package com.example.backend.mapper;

import com.example.backend.model.Device;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
@Repository
public interface DeviceMapper {
    List<Device> getDeviceList(int userId);

    Device getDevice(String name);

    int addNewDevice(@Param("form") Map<String, Object> map);

    int editDevice(@Param("form") Map<String, Object> map);

    //int editDeviceWithoutDescription(@Param("form") Map<String, Object> map);

    List<Device> getActiveDeviceList(int userId);

    List<Map<String, Object>> getDeviceTypeDistribution(int userId);
}
