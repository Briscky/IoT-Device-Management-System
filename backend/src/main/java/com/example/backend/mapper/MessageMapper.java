package com.example.backend.mapper;
import com.example.backend.model.Message;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface MessageMapper {
    List<Message> getTodayMessageList(String clientId);
}
