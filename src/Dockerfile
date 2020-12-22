FROM node:11.13.0-alpine

# create destination directory
RUN mkdir -p /client
WORKDIR /client

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY ./client /client/
RUN npm install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run generate
RUN npm run build

# expose 5000 on container
EXPOSE 3000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=80

# start the app
# CMD [ "npm", "start" ]
