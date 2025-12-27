rebuild: down clean build start
down:
	docker compose down
clean:
	sh gradlew clean
	rm -rf ./src/main/frontend/.next && rm -rf ./src/main/frontend/node_modules
build: ./src/main/frontend/
	sh gradlew build
	cd ./src/main/frontend && npm ci && npm run build
start:
	docker compose build --no-cache
	docker compose up --watch