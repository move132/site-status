# 使用 node 的官方镜像作为基础镜像
FROM node:lts as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件和文件夹到工作目录
COPY . .

# 构建应用
RUN npm run build


# 生产环境使用 nginx
FROM nginx:stable-alpine as production-stage

# 从构建阶段复制构建结果到 nginx 目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 运行 nginx
CMD ["nginx", "-g", "daemon off;"]