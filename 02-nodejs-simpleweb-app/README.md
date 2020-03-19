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