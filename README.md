# mongoWebInterface
To start app you need to start your mongoDB first. You should run mongod in terminal, then run file app.js
After app starts, you just need to put uri in field uri mongo and press button "connect to mongo"

Application, also, may be run in container. use command ./build in root workdir. This script ask you to add version of your container, the name of container will be mongowebui, you may change it in script and set it as you want

Format of uri string should be this: <b>mongodb://%your PC IP%:27017/ufr_cardfix</b> 

or if you use auth -- <b>mongodb://%username%:%password%@%your PC IP%:27017/ufr_cardfix</b> or another port, if you change it manually

Also you need to comment string with bind_ip in mongod.conf file if you want to set remote connect to your DB. If you do not have this file, you may create it manually
~~~~
$ touch mongod.conf
$ chmod 777 mongod.conf
~~~~
~~~~
$ vim /etc/mongod.conf
#bind_ip = 127.0.0.1
~~~~
Warning: do not use this setup to your database not for test. You should add auth to your DB.
Here is wery simple instruction, how to config auth to your DB: https://ianlondon.github.io/blog/mongodb-auth/
Then run you DB
~~~~
$ mongod --config /etc/mongod.conf
~~~~
You may catch error like: exception in initAndListen: IllegalOperation: Attempted to create a lock file on a read-only directory: /data/db, terminating

It meanse that you are not allowed to write into file /data/db. You just need to run this command with s
To start your container first time use command:
~~~~
$ docker run -p 8080:8080 %container-name%:%container-version%
~~~~
also see https://docs.mongodb.com/manual/reference/configuration-options/
