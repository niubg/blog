#!/bin/bash
source /etc/profile

echo '进入博客目录'
cd /home/blog/view
## 拉取最新代码
echo '开始拉去最新代码'
git pull
echo '进入项目目录'
cd blog
## 打包静态文件
echo '开始构建静态文件'
yarn install
yarn run build
echo '最新文章处理完成'
