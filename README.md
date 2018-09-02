# Ng2Words

Project for personal day-by-day diary.

To install, follow the instruction below.

To run just `npm i && ng build --prod && node server/server.js`

## Install instruction

1. Install MongoDB from https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.2-signed.msi/download
2. Create admin user by
```
> use admin
> db.createUser({
		user: "<adminusername>",
	    pwd: "<adminpassword>",
	    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
	})
```
3. Restart db with --auth option enabled
then rerun database with --auth option:
> mongod --auth --port 27017 --dbpath <path to /data directory>
> `db.auth("<adminusername>", "<adminpassword>")`

4. Create db for an app

> use wordly
> db.createUser({
    user: "wordly",
    pwd: "<your password>",
    roles: [ { role: "readWrite", db: "wordly" }]
  })

5. Create config file `express/secrets.json` containing credentials:

secrets.json:
{
	"dbuser": "wordly",
	"dbpassword": "<yourpassword>"
}
