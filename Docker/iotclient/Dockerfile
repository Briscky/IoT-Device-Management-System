# Dockerfile in iotclient/
# FROM openjdk:8-jdk-alpine
# WORKDIR /app
# COPY . .
# RUN ./mvnw clean package
# CMD ["java", "-jar", "target/iotclient-1.0.0.jar"]

# 使用 Maven 构建
FROM maven:3.6.3-jdk-8
WORKDIR /app
COPY . .
RUN mvn clean package
CMD ["java", "-jar", "target/iotclient-1.0.0.jar"]
