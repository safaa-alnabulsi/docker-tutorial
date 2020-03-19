# Specify base image
FROM node:alpine

WORKDIR /usr/app

# Download and install a dependency into the workdir
COPY ./ ./
RUN npm install

# Run follwoing commands after starting the container
CMD ["npm","start"]