FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY build /app/build
COPY build_frontend /app/build_frontend
# COPY config.json /app
CMD node build/index.js
EXPOSE 3000
