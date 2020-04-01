#  Multi-Container  React Application

A poc app which takes a number and calcualte its fibonacci number.
This backend of the app consists of: 
 - React server: default port is 3000
 - Express server: default port is 5000
 - Redis: in-memory data store for saving key-value of calculated values.
 - Postgres db for storing values of previosuly submitted numbers.
 - Nginx: it is more convenient than using ports to relay on nginx such that requests will be redirected
  to express server if they have `/api`, otherwise nginx will redirect them to recat server.

The goal of useless complexity here is to use more dependencies and simulate production enviroment. 
 
### Development


    $ docker-compose up

Check the containers:

    $ docker ps
    CONTAINER ID        IMAGE                                          COMMAND                  CREATED              STATUS              PORTS               NAMES
    7a06fb66ecef        05-multi-container-fib-calculator-app_worker   "docker-entrypoint.s…"   About a minute ago   Up About a minute                       05-multi-container-fib-calculator-app_worker_1
    d5838f3d6907        redis:latest                                   "docker-entrypoint.s…"   About a minute ago   Up About a minute   6379/tcp            05-multi-container-fib-calculator-app_redis-server_1
    bb0d15f48128        05-multi-container-fib-calculator-app_server   "docker-entrypoint.s…"   About a minute ago   Up About a minute                       05-multi-container-fib-calculator-app_server_1
    227fd7de9b07        postgres:latest                                "docker-entrypoint.s…"   About a minute ago   Up About a minute   5432/tcp            05-multi-container-fib-calculator-app_postgres_1

### Tests
        
### Production

## References

- https://hub.docker.com/_/postgres
- https://hub.docker.com/_/redis
- https://hub.docker.com/_/nginx