# shoplist_api

# Prepare mongoDb (assuming it is installed locally)
1. mongosh (to access shell)
2. use shop_list (create db if it doesn't exist or switch to existing test db)
4. db.createUser(
  {
    user: <your_user>,
    pwd: <your_pass>,
    roles: [ { role: "readWrite", db: "shop_list" } ]}); (create new user)
5. create .env file and copy data from env_example. User credentials for user and password above
6. db.testDb (create admin user to have access to admin panel)
7. node app/seeder.mongo.js (seed collection with test data)
