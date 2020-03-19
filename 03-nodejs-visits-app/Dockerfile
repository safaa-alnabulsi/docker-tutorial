# Specify base image
FROM node:alpine

WORKDIR /usr/app

# Download and install a dependency into the workdir
COPY package.json .
RUN npm install
COPY . .

# Run follwoing commands after starting the container
CMD ["npm","start"]