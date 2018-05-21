# mongoWebInterface
To start app you need to start your mongoDB first. You should run mongod in terminal, then run file app.js
Application, also, may be run in container. use command ./build in root workdir. This script ask you to add wersion of your container
It will work correctly if you change your uri link in app.js, mongodb://%your PC IP%:27017/ufr_cardfix

Also you need to comment string with bind_ip in mongod.conf file. If you do not have this file, you may create it manually
~~~~
$ touch mongod.conf
$ chmod 777 mongod.conf
~~~~
~~~~
$ vim /etc/mongod.conf
#bind_ip = 127.0.0.1
~~~~
Warning: do not use this setup to your database in prod. You should add auth to your DB.
Then run you DB
~~~~
$ mongod --config /etc/mongod.conf
~~~~
To start your container first time use command:
~~~~
$ docker run -p 8080:8080 %container-name%
~~~~
also see https://docs.mongodb.com/manual/reference/configuration-options/
