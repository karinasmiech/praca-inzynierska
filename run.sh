#!/bin/bash

cd ./admin
docker build -t praca-inzynierska-admin .
cd ../backend
docker build -t praca-inzynierska-backend .
cd ..
docker-compose up -d
