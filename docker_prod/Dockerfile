# analysis_report/docker/Dockerfile

#pull official base-image
FROM node:16-alpine
WORKDIR /usr/src/

#add usr/src/app/node_modules/.bin to $PATH
ENV PATH /usr/src/node_modules.bin:$PATH

# ##install and cache app dependencies
COPY package.json .
COPY package-lock.json .
# #npm install
RUN npm ci
RUN npm install react-scripts@4.0.3 -g --silent

#set environment
# ARG REACT_APP_API_SERVICE_URL
# ENV REACT_APP_API_SERVICE_URL $REACT_APP_API_SERVICE_URL
# ARG NODE_ENV
# ENV NODE_ENV $NODE_ENV

# #start app
# CMD ["npm", "start"]

RUN npm run build

FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
COPY ./conf /etc/nginx

COPY --from=builder /usr/src/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]