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

    $ docker-compose up --build

Make sure to run this before rebuilding when changing the docker-comose.yaml:

    $ docker-compose down
    
Check the containers:

    $ docker ps
    CONTAINER ID        IMAGE                                          COMMAND                  CREATED              STATUS              PORTS                  NAMES
    4d2c6da33607        05-multi-container-fib-calculator-app_nginx    "nginx -g 'daemon of…"   38 seconds ago       Up 37 seconds       0.0.0.0:3050->80/tcp   05-multi-container-fib-calculator-app_nginx_1
    1d262e9e2cb4        05-multi-container-fib-calculator-app_api      "docker-entrypoint.s…"   58 seconds ago       Up 55 seconds                              05-multi-container-fib-calculator-app_api_1
    db5efdaec644        postgres:latest                                "docker-entrypoint.s…"   About a minute ago   Up 58 seconds       5432/tcp               05-multi-container-fib-calculator-app_postgres_1
    5f64187fa03d        redis:latest                                   "docker-entrypoint.s…"   About a minute ago   Up 58 seconds       6379/tcp               05-multi-container-fib-calculator-app_redis-server_1
    ccc86b019181        05-multi-container-fib-calculator-app_worker   "docker-entrypoint.s…"   About a minute ago   Up 56 seconds                              05-multi-container-fib-calculator-app_worker_1
    0e7d6a97c2a9        05-multi-container-fib-calculator-app_client   "docker-entrypoint.s…"   About a minute ago   Up 38 seconds                              05-multi-container-fib-calculator-app_client_1

Play with the calculator in here: http://localhost:3050/
        
### Production

- After creating prod docker files, it will be all deployed to AWS with [.travis.yml](../.travis.yml.example-05)
Make sure to add DOCKER_ID and DOCKER_PASSWORD to your travis pipeline configurations.

- We will only put 4 continers inside EB (client, worker, server, nginx). The redis and postgres conatiners will be out of it.
Redis will be on EC and postgres will be changed into RDS inside the account.
 
- Make sure all the resources you will create are living inside one VPC in the same region.

####  From AWS console (or cli)

1. create a new Application with new Enviroment, Multi-docker as a platform.
Note: make sure to configure the Network.

2. create Aurora Postgres. 

3. create Elastic cache with t2.micro type.

4. create Security group to control access to EB, RDS (Postgres), EC(Redis) to enable them to communicate to each other.
        
       Protocol: Custom TCP 
       Port Range: 5432-6379
       Source: same name of this SG

5. modify the EC(redis) security group section and add the lastly created SG from step 4.

6. modify the RDS(postgres) security group section and add the lastly created SG from step 4.

7. modify the EB  -> configurations -> instances -> security group section and add the lastly created SG from step 4.

8. modify the EB  -> configurations -> software -> add enviroment variable:
        
        REDIS_HOST: get value from aws console EC, redis host in aws without the port
        REDIS_PORT: get value from aws console EC, redis
        
        PGUSER: the user from step 2
        PGPASSWORD the password from step 2
        PGHOST: copy from aws console -> RDS
        PGPORT: use default or copy from aws console -> RDS 
        
_Note_: in production, we use cloudformation to create all of the above.

## References

- https://hub.docker.com/_/postgres
- https://hub.docker.com/_/redis
- https://hub.docker.com/_/nginx