## NovelApi-koa

#### v2
* 规范json返回值
* 梳理项目结构
* 优化代码
* 补充测试用例
* 添加用户注册，远程书架部分 < 做鉴权，根据权限决定每日save的权限，同时限定每日的用户，比如内存维护10个表，如果length > 10 就不再从数据库中取数据，其他用户统统拒绝 >