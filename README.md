# praca-inzynierska

## Run app
* Provide `.env` file in `backend` directory (see `.env-template`).
* Build backend docker image:

```bash
cd backend
npm run build-image
```

* Setup backend host in `.env` or `.env.local`
* Build admin docker image:

```bash
cd admnin
npm run build-image
```

* Run docker compose:

```bash
docker-compose up -d
```
