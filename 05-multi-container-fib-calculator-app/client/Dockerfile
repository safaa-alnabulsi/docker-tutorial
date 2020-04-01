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
# change the default port of nginx to 3000
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
# The nginx srever will start automaticlly for us