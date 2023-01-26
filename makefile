
run-dev:
	npm run dev

setup:
	npm install
	npx prisma db pull
	npx prisma db generate

build:
	npm run build
