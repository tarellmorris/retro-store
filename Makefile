frontend = ./src/main/frontend

rebuild: down clean build start
lint:
	cd $(frontend) && npm run lint
down:
	docker compose down
clean:
	sh gradlew clean
	rm -rf ./src/main/frontend/.next && rm -rf ./src/main/frontend/node_modules
build:
	sh gradlew build
	cd $(frontend) && npm ci && npm run build
start:
	docker compose build --no-cache
	docker compose up --watch