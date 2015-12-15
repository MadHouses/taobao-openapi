var Taobao = require("../index");

var top = new Taobao({
    app_key: "yourAppKey",
    app_secret: "yourAppSecret"
});

top.configure({
    session: "yourSession"
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