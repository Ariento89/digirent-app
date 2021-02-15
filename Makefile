SHELL := /bin/bash # Use bash syntax

install:
	npm install

build-dev:
	docker build --build-arg API_URL=http://localhost:5000/api -t digirent-app-dev .

serve:
	docker run -it -p "3000:3000" --network=digirent-api_default digirent-app-dev npm start
