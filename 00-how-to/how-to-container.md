# Basic commands for containers

- Creation:
Download image from Dockerhub and create a container, start it and execute the command

      docker run busybox echo Hello world

Download image from Dockerhub to local image cache and create a container. This returns the container ID

    docker create busybox 

Start the contianer 

    docker start -a <container-id> 

- Termination: 
Stop the contianer gracfully. This will wait until running processes finish.

    docker stop <container-id> 

Stop the contianer immediately. This will kill running processes.
    
    docker kill <container-id> 

- Logs:

      docker logs <-t> <-f>

- Run commands inside container:

Run a specific command:

      docker exec -it <container-id> redis-cli

Open a shell and execute many commands:

      docker exec -it <container-id> sh

- List containers

Only running now
 
      docker ps 

Both runnning now and previously stopped

      docker ps -all

- Cleanup:
Free up local machine from previously running contrainers
    
      docker system prune