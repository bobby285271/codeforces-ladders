## Codeforces Ladders

~~简陋的~~ Codeforces 做题追踪系统，Web 前端设计与开发大作业。

Version 1.0-20200705

### 功能

* 用户 Handle 的设置、储存和重置。
* 算法学习与做题练习一站式一体化。
* 用户个人信息、比赛 Rating、评级的显示。
* 用户做题数据与比赛数据可视化。
* 原 Static A2OJ 题单的迁移。
* 题单过题情况可视化，包括未完成、尝试过、通过。

### 实现

* Bootstrap - 响应式布局。
* Codeforces API - 用户数据的获取。
* Chart.js - 做题数据与比赛数据可视化。

### 部署

> 必须使用 HTTP 服务器，不能直接双击点开 HTML 文件，否则会导致资源加载失败。

将目录上传到 Apache、NGINX 等任意 HTTP 服务器相应的目录即可，无需其它依赖。

### 访问

因为使用 Bootstrap 4.5，需要现代浏览器支持，请注意对于 Internet Explorer 只支持 IE 10+ 版本。

详见：[Bootstrap 文档说明](https://getbootstrap.com/docs/4.5/getting-started/browsers-devices/)

### 开发者

Bobby Rong <admin@bobby285271.top>