#!/bin/sh

#
#使用方法
#mmall:front_deploy.sh mmall_fe
#admin:front_deploy.sh admin_fe
#

GIT_HOME=/developer/git-repository
DEST_PATH=/product/frontend

# clear git dist
echo -e "==============Clear git Dist=========="
rm -rf ./dist

# git操作
echo -e "==============git checkout release=========="
git checkout release

echo -e "==============git pull=========="
git pull

# npm install
echo -e "==============npm install=========="
npm install --registry=http://registry.npm.taobao.org

# npn 打包
echo -e "==============npm install=========="
npm run dist

if [ -d "./dist" ]; 
    then 
    echo -e "==============dest backup=========="
    mv $DEST_PATH/mmall_fe/dist $DEST_PATH/mmall_fe/dist.bak

    #copy
    echo -e "==============dest copy=========="
    cp -R ./dist $DEST_PATH/mmall_fe/

    #echo result
    echo -e "============Deploy Success========"
else
    echo -e "============Deploy Error========"
fi