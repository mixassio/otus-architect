app:
	docker-compose up

app-build:
	docker-compose build
	docker-compose run app npm install
	# docker-compose run app npm run typeorm migration:run
	docker-compose run app2 npm install

app-bash:
	docker-compose run app bash