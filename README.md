# taobao-openapi
淘宝开放平台SDK，用于node平台

#Install

    npm install taobao-openapi --save
    
#API Examlpe

    var Taobao = require("taobao-openapi");
    
    var top = new Taobao({
        app_key: "yourAppKey",
        app_secret: "yourAppSecret"
    });
    
    top.get("taobao.shop.get", {
        nick: "nickname",
        fields: "sid,cid,nick,title,desc,shop_score"
    }, function(err, body){
        if(err){
            return console.log(err);
        }
        console.log(body);
    });
    
    top.post("taobao.shop.get", {
        nick: "nickname",
        fields: "sid,cid,nick,title,desc,shop_score"
    }, function(err, body){
        if(err){
            return console.log(err);
        }
        console.log(body);
    });
    
#Features

1、configure

配置全局参数

    var Taobao = require("taobao-openapi");
    
    var top = new Taobao({
        app_key: "yourAppKey",
        app_secret: "yourAppSecret"
    });
    
    top.configure({
        session: "yourSession"
    });
    
### 目前有效参数：

| attribute    | description   | default  |
| -------------|:-------------:| -----:   |
| debug        | 是否开启沙箱    | false    |
| https        | https         | false    |

目前只支持json响应格式，不支持xml格式；

目前只支持MD5加密方法；

欢迎fork！