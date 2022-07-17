# analysis_report/docker/Dockerfile

#pull official base-image
FROM node:16-alpine
WORKDIR /usr/src/

#add usr/src/app/node_modules/.bin to $PATH
ENV PATH /usr/src/app/node_modules.bin:$PATH

# ##install and cache app dependencies
COPY package.json .
COPY package-lock.json .
# #npm install
RUN npm ci
RUN npm install react-scripts@4.0.3 -g --silent

# #start app
CMD ["npm", "start"]