# Nodejs & React app

1. Generate react project

         npx create-react-app frontend

2. Important commands:

        npm run start # for development use only
        npm run test  # run tests 
        npm run build # build production version of the application
        
3. Two docker files one for dev and one for prod

## Development

### Using docker cli
- Build docker image for development:
        docker build -f Dockerfile.dev . -t safaa1001/react-app
        
- run docker and map the port:
        
        docker run -di -p 3000:3000 safaa1001/react-app
check: http://localhost:3000/

- For continuous development, we setup mapping between our working directory and inside the container. So we see changes immediately. 
       
        docker run -di -p 3000:3000 -v $(pwd):/app safaa1001/react-app
This will not work because of the `node_modules` folder inside the container
The correct command is as following, we keep `node_modules` folder as it is inside the container:

        docker run -di -p 3000:3000 -v /app/node_modules -v $(pwd):/app safaa1001/react-app

### Using docker-compose