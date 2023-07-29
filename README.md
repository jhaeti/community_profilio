# PLEASE FOLLOW THE GUIDE IN OTHER
My template for all pojects

## NOTE: If you dont want the ci / cd set up remove the .github folder in the root and dont do the configuration below that says CI/CD

### For Eslint to work perfectly as prefered
- You need to open frontend and backend folder in separate windows.
- Since they both have eslint installed with different configuraton.


## Inside the backend folder 
#### create .env file in the root provide this values
```env
MONGO_DEV_URI=
MONGO_TEST_URI=
JWT_SECRET_KEY=
AUTH_COOKIE_NAME=
PORT=5000
DEFAULT_ADMIN_NAME=
DEFAULT_ADMIN_EMAIL=
DEFAULT_ADMIN_PASSWORD=
CHOKIDAR_USEPOLLING=true
```
#### Installing dependencies or packages
```sh
npm i
```
#### To run backend in development.
  1) First make sure you have mongodb installed and running.
  2) ***Or*** you can simply spin a mongo container with volumes and ports setup correctly and use that instead.
  3) Then run
```sh
  npm run dev
```
#### To run test
```sh
npm test
```


## Inside the frontend folder
#### create .env file in the root provide this values
```env
NEXT_PUBLIC_API_DEV_URL=http://localhost:5000
CHOKIDAR_USEPOLLING=true
```
#### Installing dependencies or packages
```sh
npm i
```
#### To run backend in development.
```sh
npm run dev
```


## CI / CD
#### - Create or purchase a remote server for the app to run on
#### - Set the server to use the remote-template-server-setup repository you create before
#### - Create a dockerhub repository to hold the backend and frontend images
#### - Create a staging environment and add these secrets
##### Note:  Its name should be **Staging**
```env
AUTH_COOKIE_NAME
DEFAULT_ADMIN_EMAIL
DEFAULT_ADMIN_NAME
DEFAULT_ADMIN_PASSWORD
JWT_SECRET_KEY
MONGO_URI
PORT
```
#### - Create a Deployment environment and add these secrets
##### Note:  Its name should be **Deployment**
```env
BACKEND_DOCKER_IMAGE
DOCKERHUB_TOKEN
DOCKERHUB_USERNAME
FRONTEND_DOCKER_IMAGE
HOST
HOST_KEY
HOST_USER
NEXT_PUBLIC_API_URL
PORT
```
#### - Uncomment push events in backend.yml and frontend.yml in .github/workflow directory
#### - Then pushing to the remote github repositoy should fire the events in the workflow directory
  
