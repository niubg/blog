#!/bin/bash
source /etc/profile

echo '进入博客目录'
cd /home/blog/view
## 拉取最新代码
echo '开始拉取最新代码'
git pull

echo '代码拉取完成！'

## 因为服务器内存低，无法使用服务器编译，故取消编译命令
#echo '进入项目目录'
#cd blog
## 打包静态文件
#echo '开始构建静态文件'
#yarn install
#yarn run build
#echo '最新文章处理完成'
