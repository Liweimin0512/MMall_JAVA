# MMall_JAVA
[![GOLD](https://img.shields.io/aur/license/yaourt.svg)]()
[![CocoaPods](https://img.shields.io/cocoapods/metrics/doc-percent/AFNetworking.svg)]()
[![Maven的中央](https://img.shields.io/maven-central/v/org.apache.maven/apache-maven.svg)]()
## 这个项目是啥？
整合SSM框架（Spring+SpringMVC+Mybatis），采用前后端分离的架构方式开发的仿天猫在线电商平台项目，服务器端源代码。通过完成本项目，掌握了如下技能：
+ 首先，当然是java web开发，包括javaEE的核心技术的实际应用；
+ 其次，学习目前最流行的java web框架——SSM框架的整合，理解其作用；
+ 再者，前后端分离式设计的具体实现。
+ 最后，就是如何真正将一个项目部署在生产环境上（我使用的是阿里云服务器）
在之后的开发中，会将本项目采用RESTfulAPI的方式实现。并且加入一些新鲜的东西。
此外，<b>本项目遵守开源协议GPL-3.0,</b>
## 需要准备什么？
<b>采用MAVEN（3.0.5）构建本项目，此外，以下是我在开发过程中用到的一些工具：</b>
* IDE我使用IDEA（项目由Maven构建，IDE选择不影响）
* 最终运行的系统是阿里云上的CentOS 64位
* JDK版本为7u80 64位
* Maven版本是3.0.5
* mysql-server-5.1.73
* nginx-1.10.2.tar.gz
## 这些分支是什么？
dev是开发分支，release是发布分支，master分支是主要分支（最新的可用版本）。
## 文档在哪里？
目前文档正在编写中，此时你可以参考我的博客。
## 项目什么样？
[网站截图](https://github.com/Liweimin0512/MMall_JAVA/blob/master/doc/myweb-1.gif)
当然，你也可以访问我部署在阿里云上的网站，[这里是链接](http://imitationtmall.xin/)
## 如何部署上线
  如果你想发布在自己的linux操作系统中，可以运行我编写的自动化发布脚本，根目录下的`deploy.sh`。在此之前，你需要完成如下的步骤：
* 保证JDK、maven、tomcat、mysql及nginx都已经安装并且正确配置；
* 将此git仓库拉取到本地的目录位置是`/development/git-repository/`
* 存在目录`/product`
关于更多的部署上线的流程，依然参考我的博客。
## 哪里可以得到帮助？
本人水平有限，项目仍在不断演进中，欢迎交流，欢迎分享。
欢迎游览我的博客[这里是博客地址](http://www.cnblogs.com/weiminLee/)
欢迎添加我的QQ`2410250284`做学术交流
欢迎Star、欢迎Fork、也欢迎你Pull requests
