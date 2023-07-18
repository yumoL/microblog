#!/bin/sh
npm run init_prd_db
npm run prd
#pm2-runtime start pm2.conf.json