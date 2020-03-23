# Build phase
FROM node:alpine as builder
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run phase
FROM nginx
# needed for elasticbeanstalk (does nothing for local development)
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
# The nginx srever will start automaticlly for us