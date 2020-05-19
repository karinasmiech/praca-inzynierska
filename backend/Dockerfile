FROM node:alpine
COPY package.json yarn.lock /app/
WORKDIR /app/
RUN ["yarn", "install", "--production"]
COPY ./ ./
CMD ["npm", "start"]
