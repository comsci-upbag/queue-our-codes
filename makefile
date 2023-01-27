
run-dev:
	npm run dev

setup:
	npm install
	# for setting up prisma the first time
	# npx prisma db generate
	# npx prisma db pull

migrate:
	npx prisma migrate dev --name init

build:
	npm run build
