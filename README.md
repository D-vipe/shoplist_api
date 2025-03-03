# MAFIA API Server
1. yarn install
# Prepare mongoDb (assuming it is installed locally)
1. mongosh (to access shell)
2. use mafia_db (create db if it doesn't exist or switch to existing test db)
4. db.createUser(
  {
    user: <your_user>,
    pwd: <your_pass>,
    roles: [ { role: "readWrite", db: "mafia_db" } ]}); (create new user)
5. create .env file and copy data from env_example. User credentials for user and password above

# start server and watching changes
1. run `npx ts-node-dev --respawn --transpile-only api/index.ts`
