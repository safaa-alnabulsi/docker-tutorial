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

4. Use `Docker compose` to connect those two containers, you can do serveral commands in once.
It's easier than using docker-cli repetitive commands.
It will create both containers on the same network without the needd to open any port between the two.
    
         docker run img                   ==  docker-compose up 
         docker build . && docker run img ==  docker-compose up --build 

http://localhost:4001/

Keep refreshing the web browser and see the number increases!