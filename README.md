# shoplist_api
1. yarn install
# Prepare mongoDb (assuming it is installed locally)
1. mongosh (to access shell)
2. use shop_list (create db if it doesn't exist or switch to existing test db)
4. db.createUser(
  {
    user: <your_user>,
    pwd: <your_pass>,
    roles: [ { role: "readWrite", db: "shop_list" } ]}); (create new user)
5. create .env file and copy data from env_example. User credentials for user and password above
6. to enable logging in the root dir create "logs" folder and 3 files:
 - combined.log
 - error.log
 - http.log

# start server and watching changes
1. run `npx ts-node-dev --respawn --transpile-only api/index.ts`
