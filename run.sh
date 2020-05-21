#!/bin/bash

cd ./admin
docker build -t praca-inzynierska-admin .
cd ../backend
docker build -t praca-inzynierska-backend .
cd ../frontend
docker build -t praca-inzynierska-frontend .

docker-compose up -d
