# 构建阶段
# 使用 Node.js 官方镜像
FROM node:alpine as build-stage
WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# 运行阶段
# 使用 Nginx 官方镜像
FROM nginx:alpine

# 从构建阶段复制构建的静态文件到 Nginx 用来提供的目录
COPY --from=build-stage /app/build /usr/share/nginx/html
# COPY ./build  /usr/share/nginx/html/

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口,Nginx 默认监听 80 端口
EXPOSE 80
# 使用默认的 Nginx 启动命令
CMD ["nginx", "-g", "daemon off;"]