a=`cat ~/Documents/untitled5/version`
a=$[a+1] | tee version
echo $a
echo -n "Введите номер версии "
read a
docker build -t mongocash:0.0.$a .
docker push mongocash:0.0.$a
