echo "===========进入git项目happymmall目录============="
cd /developer/git-repository/MMall_JAVA


echo "==========切换到release(发布分支）==============="
git checkout release

echo "==================git fetch======================"
git fetch

echo "==================git pull======================"
git pull


echo "===========编译并跳过单元测试===================="
mvn clean package -Dmaven.test.skip=true


echo "============删除旧的ROOT.war==================="
rm /developer/apache-tomcat-7.0.73/webapps/ROOT.war


echo "======拷贝编译出来的war包到tomcat下-ROOT.war======="
cp /developer/git-repository/MMall_JAVA/target/mmall.war  /developer/apache-tomcat-7.0.73/webapps/ROOT.war


echo "============删除tomcat下旧的ROOT文件夹============="
rm -rf /developer/apache-tomcat-7.0.73/webapps/ROOT



echo "====================关闭tomcat====================="
/developer/apache-tomcat-7.0.73/bin/shutdown.sh


echo "================sleep 10s========================="
for i in {1..10}
do
	echo $i"s"
	sleep 1s
done


echo "====================启动tomcat====================="
/developer/apache-tomcat-7.0.73/bin/startup.sh




