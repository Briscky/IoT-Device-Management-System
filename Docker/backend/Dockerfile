FROM maven:3.8-openjdk-17

WORKDIR /app
COPY . . 
RUN mvn package
# 暴露端口
EXPOSE 8080

# 设置启动命令
ENTRYPOINT ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]


