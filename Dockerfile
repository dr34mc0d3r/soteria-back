# https://www.digitalocean.com/community/tech_talks/how-to-deploy-a-resilient-node-js-application-on-kubernetes-from-scratch
# docker build -t dr34m3r/node-app-rest .
# https://www.youtube.com/watch?v=BeFT1hcpUPo

FROM node:13-alpine
ENV NODE_ENV production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD npm start
