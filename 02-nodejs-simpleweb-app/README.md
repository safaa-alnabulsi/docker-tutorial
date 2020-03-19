# nodejs-simpleweb-app

## Development

1. Build docker

       docker build -t safaa1001/nodejs-simpleweb-app .
    
2.  Run a container of that image:

       docker run safaa1001/nodejs-simpleweb-app       

check: http://localhost:8080/
Ops! won't work. We need to do **Port mapping**

3. Run a container of that image and map requests to port 8080:
   
          docker run -p 8080:8080 safaa1001/nodejs-simpleweb-app

check: http://localhost:8080/ and you will see "Hi there"
Note: those two ports don't need to be identical

          docker run -p 5000:8080 safaa1001/nodejs-simpleweb-app

Now you can reach your app: http://localhost:5000/

4. Enter the shell of the container

        $ docker ps
        CONTAINER ID        IMAGE                            COMMAND                  CREATED             STATUS              PORTS                    NAMES
        ac75eac37577        safaa1001/nodejs-simpleweb-app   "docker-entrypoint.s…"   6 seconds ago       Up 4 seconds        0.0.0.0:5000->8080/tcp   quirky_lumiere
        
        $ docker exec -it ac75eac37577 sh
        /usr/app # ls
        Dockerfile         index.js           package-lock.json
        README.md          node_modules       package.json

