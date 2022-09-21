# TP2 - React + Redux + PWA
Clément DIMANCHIN, 21/09/2022

## Commands

### URL
    127.0.0.1:8085

### Create App

```bash
docker run -ti --rm -v $PWD:/home/node/app -w /home/node/app node /bin/bash # Temporary container
yarn global add create-react-app # Globally add the create-react-app tool
create-react-app react-app --template cra-template-pwa # Create an app named react-app with PWA template
```

### Create the container
```bash
docker-compose up
```

### Remove the container
```bash
docker-compose down
```

### Start the container
```bash
docker-compose start
```

### Stop the container
```bash
docker-compose stop
```

### Access to container logs
```bash
docker-compose logs -f
```

### Access to docker container
```bash
docker-compose exec react /bin/bash
```