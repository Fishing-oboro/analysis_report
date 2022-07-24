# analysis_report/docker/Dockerfile

#pull official base-image
FROM node:16-alpine
WORKDIR /usr/src/

#add usr/src/app/node_modules/.bin to $PATH
ENV PATH /usr/src/node_modules.bin:$PATH

# ##install and cache app dependencies
COPY package*.json ./

# #npm install
RUN npm install

# #start app
CMD ["npm", "start"]
