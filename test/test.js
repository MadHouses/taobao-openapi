var Taobao = require("../index");
var moment = require('moment');

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
}, function(err, body) {
    if (err) {
        return console.log(err);
    }
    console.log(body);
});

top.post("taobao.shop.get", {
    nick: "nickname",
    fields: "sid,cid,nick,title,desc,shop_score"
}, function(err, body) {
    if (err) {
        return console.log(err);
    }
    console.log(body);
});

var params = {
    start_created: moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    end_created: moment().format('YYYY-MM-DD HH:mm:ss')
};
top.getAllTrades(params, function(results) {
    console.log(results);
});