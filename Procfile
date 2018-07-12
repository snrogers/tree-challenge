dev-serve: npm run dev-serve
dev-test-client: npm run dev-test-client
dev-test-server: npm run dev-test-server
dev-transpile: npm run dev-transpile

build: npm run build
db-create: sequelize db:create --config app/db/config/config.json
db-migrate: sequelize db:migrate --migrations-path app/db/migrations/ --config app/db/config/config.json
web: NODE_ENV=production npm start
