# Dockerfile

# base image
FROM node:12.16.3

# To build the nextjs app with {API_URL} as env variable
ARG API_URL
ARG API_URL_WEBSOCKET


ENV NEXT_PUBLIC_API_BASE_URL=${API_URL}
ENV NEXT_PUBLIC_API_URL_WEBSOCKET=${API_URL_WEBSOCKET}

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Copy package.json, package-lock.json
COPY package*.json /usr/src/

# Install dependencies
RUN npm install

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install

# build the app
RUN npm run build
