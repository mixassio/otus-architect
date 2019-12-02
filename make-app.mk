app:
	docker-compose up

app-build:
	docker-compose build
	docker-compose run app npm install
	docker-compose run app npm run typeorm migration:run

app-bash:
	docker-compose run app bash