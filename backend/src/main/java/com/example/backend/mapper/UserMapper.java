package com.example.backend.mapper;

import com.example.backend.model.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;


@Mapper
@Repository
public interface UserMapper {
    User checkName(String name);

    int registerUser(@Param("form") Map<String, Object> form);

    User checkEmail(String email);

    User name_passwordCheck(@Param("form") Map<String, Object> form);

    User email_passwordCheck(@Param("form") Map<String, Object> form);

    User getUserInfo(String name);

    int configEmail(@Param("form") Map<String, Object> form);

    int configPassword(@Param("form") Map<String, Object> form);
}
