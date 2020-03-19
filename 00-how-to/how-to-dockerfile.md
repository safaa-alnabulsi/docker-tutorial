# Basic commands for docker files

After you create your Dockerfile, you can build an image which will be stored locally in the cache as following:

    cd 01-redis-image && docker build .

- For manually generating the same image from inside a container:

      docker run -it alpine sh
       # apk add --update redis
       
   In another terminal:
     
      docker commit -c "CMD ['redis-server']" <container-id> 
      generated-hash    
      
      docker run generated-hash
      