# samurai-doc
 swagger文档转api-doc文档

###### 安装
 ``` javascript
 全局安装cli
 npm install -g samurai-doc
 or
 yarn global add samurai-doc
 ```


###### 打包
``` javascript
samurai build -c ./config.json
```

###### 配置文件模版
```javascript
{
  configs: [{
    "url": "http://localhost:19003",
    "name": "repay",
    "version": "1.0.0",
    "description": "apiDoc basic example",
    "title": "Custom apiDoc browser title"
  }],
  output: "./dist"
}
```
