# mongoWebInterface
# to start app you need to start your mongoDB first. You should run mongod in terminal, then run file app.js
# Application, also, may be run in container. use command docker build . in root workdir.
# It will be work correctly if you change your uri link in app.js, mongodb://%your PC IP%:27017/ufr_cardfix
# Also you need to add your PC IP in whitelist in your mongo config.
--------------------------------------
$ vim /etc/mongod.conf

# /etc/mongod.conf

# Listen to local and LAN interfaces.
#add your PC IP in string below
bind_ip = 127.0.0.1,%your PC IP%
--------------------------------------
# Then use command docker run -p 8080:8080 %container-name%
