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
- start development container
        
        docker-compose up
        
whenever you change `app.js` you will see the change directly in the web page.        

## Tests

### Using docker cli:

To run the tests:

        docker run -it safaa1001/react-app npm run test   

This doesn't support live tests modification.
        
### Using docker-compose:

- Run the docker container and get the container id, then run the tests:
        $ docker-compose -d
        
        $ docker ps
        CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
        9577d74683fc        frontend_web        "docker-entrypoint.s…"   About an hour ago   Up 3 seconds        0.0.0.0:3000->3000/tcp   frontend_web_1
      
        $ docker exec -it 9577d74683fc npm run test
Downside: remember the <CONTAINER ID> each time.

- Another solution is using another service `tests` in docker-compose.yaml.
This will have same config of `web` service but we will overwrite the startup command.

Downside: getting the output of tests in the same logging interface of docker-compose, no custom input to the test suite.

- Enter the shell of tests container:

        $ docker ps
        CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
        ff4253c4b766        frontend_tests      "docker-entrypoint.s…"   5 minutes ago       Up 4 seconds                                 frontend_tests_1
        9577d74683fc        frontend_web        "docker-entrypoint.s…"   About an hour ago   Up 4 seconds        0.0.0.0:3000->3000/tcp   frontend_web_1

        $ docker exec -it  ff4253c4b766 sh
        /app # ps
        PID   USER     TIME  COMMAND
            1 root      0:00 npm
           17 root      0:00 node /app/node_modules/.bin/react-scripts test
           24 root      0:06 node /app/node_modules/react-scripts/scripts/test.js
           39 root      0:00 sh
           46 root      0:00 ps

