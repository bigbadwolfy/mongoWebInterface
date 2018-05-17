a=`cat ~/Documents/untitled5/version`
a=$[a+1] | tee version
echo $a
echo -n "Введите номер версии "
read a
docker build -t docker.moscow.alfaintra.net/mongocash:0.0.$a .
docker push docker.moscow.alfaintra.net/mongocash:0.0.$a
