# koa2 microblog

## First create logs folder
```
mkdir -p logs/app
mkdir -p logs/nginx
```

## Start in production mode
```
docker-compose up
```

## Development
```
docker-compose -f docker-compose.dev.yaml up
npm run dev
```