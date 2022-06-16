FROM node:14.15.4

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install -g npm
RUN npm cache clean -force
# RUN npm install "@ant-design/icons" --save
# RUN npm install "axios" --save
# RUN npm install "react-router-dom" --save

# RUN npm i
CMD ["npm", "run", "start"]

# # build environment
# FROM node:14.15.4-alpine as build

# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# COPY ./ ./

# RUN npm install -g npm
# RUN npm cache clean -force
# RUN npm build
# RUN npm i

# # production environment
# FROM nginx:stable-alpine

# COPY --from=build /app/build /usr/share/nginx/html
# COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]