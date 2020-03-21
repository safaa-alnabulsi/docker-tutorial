# nodejs-visits-app

## Development

1. Build docker

       $ docker build -t safaa1001/nodejs-visits-app .
    
2.  Run a container of that image:

       
      $ docker run -p 8081:8081 safaa1001/nodejs-visits-app       

check: http://localhost:8081/
Ops! won't work. We need `redis` server.

3. Run a redis containter:
    
       $ docker run redis
       $ docker run -p 8081:8081 safaa1001/nodejs-visits-app       

You still have the error. Networking is needed between those two different containers.

4. Use `Docker compose` to connect those two c
ontainers, you can do serveral commands in once.
It's easier than using docker-cli repetitive commands.
It will create both containers on the same network without the needd to open any port between the two.
    
         docker run img                   ==  docker-compose up 
         docker build . && docker run img ==  docker-compose up --build 

http://localhost:4001/

Keep refreshing the web browser and see the number increases!

5. to stop one container 

        docker stop <container-id>

to stop a group of containers running in the background
        
        docker-compose down

6. Simulate crashing with `process.exit(0)`, we run `docker-compose up --build` then we refresh the browser and
 get `03-nodejs-visits-app_node-app_1 exited with code 0` in the outputs.
 When we check running containers with `docker ps`, we see that the node container doesn't show up.
 
7. Definition of restart policies:
- "no": never attempt to restart this container if it stops or crashes
- always: if this container stops **for any reason** awlays attempt to restart it
- on-failure: only restart if the container stops with an **error code**
- unless-stopped: always restart unless the developers forcibly stop it

We add this change to the Dockerfile.

8. to list running containers defined in docker-compose.yaml file, run the following in the same folder of the file:

        $ docker-compose ps
                    Name                           Command              State           Ports         
        ----------------------------------------------------------------------------------------------
        03-nodejs-visits-app_node-      docker-entrypoint.sh npm        Up      0.0.0.0:4001->8081/tcp
        app_1                           start                                                         
        03-nodejs-visits-app_redis-     docker-entrypoint.sh redis      Up      6379/tcp              
        server_1                        ...                                                