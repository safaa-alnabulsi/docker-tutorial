# Specify base image
FROM node:alpine

# Download and install a dependency
COPY ./ ./
RUN npm install

# Run follwoing commands after starting the container
CMD ["npm","start"]