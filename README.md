# Ng2Words

Project for personal day-by-day diary.

To run just `npm i && ng build --prod && node server/server.js`



## Install

First thing to do is install MongoDB (https://www.mongodb.com/download-center?ct=atlasheader2#community). Please download it from the official web-site and install as usually.


Then you have to configure authentication.

Run mongodb server

> mongod --port 27017 --dbpath <path to /express/data directory>

Or for Win:

> "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --port 27017 --dbpath <path to /express/data directory>


Then create admin user

> mongo --port 27017

> use admin
> db.createUser({
		user: "moadmin",
	    pwd: "drunk horse singing am@zing",
	    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
	})
	
then rerun database with --auth option:

> mongod --auth --port 27017 --dbpath <path to /express/data directory> 
	
also you need to do `db.auth("moadmin", "drunk horse singing am@zing")` in mongo console using admin database and create your own user for your database.

type:

> use wordly
> db.createUser({
    user: "wordly",
    pwd: "l0ve is sweet pain",
    roles: [ { role: "readWrite", db: "wordly" }]
  })


then create file named `eclipse/secrets.json` containing credentials:

secrets.json:
{
	"dbuser": "wordly",
	"dbpassword": "l0ve is sweet pain"
}

and run server by:

> cd express && npm start

