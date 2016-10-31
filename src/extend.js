'use strict';
var Taobao = require('./index');
var async = require('async');

Taobao.prototype.getAllTrades = function(params, cb) {
    var fields = [
        'seller_nick',
        'pic_path',
        'payment',
        'seller_rate',
        'post_fee',
        'receiver_name',
        'receiver_state',
        'receiver_address',
        'receiver_zip',
        'receiver_mobile',
        'receiver_phone',
        'consign_time',
        'receiver_country',
        'receiver_town',
        'order_tax_fee',
        'shop_pick',
        'tid',
        'num',
        'num_iid',
        'status',
        'title',
        'type',
        'price',
        'discount_fee',
        'total_fee',
        'created',
        'pay_time',
        'modified',
        'end_time',
        'seller_flag',
        'buyer_nick',
        'has_buyer_message',
        'credit_card_fee',
        'step_trade_status',
        'step_paid_fee',
        'mark_desc',
        'shipping_type',
        'adjust_fee',
        'trade_from',
        'service_orders',
        'buyer_rate',
        'receiver_city',
        'receiver_district',
        'orders',
        'rx_audit_status',
        'post_gate_declare',
        'cross_bonded_declare'
    ];
    var newParams = Object.assign(params, {
        fields: fields.join(','),
        page_no: 1,
        page_size: 100,
        use_has_next: true
    });
    var has_next = false;
    var self = this;
    var arr = [];
    async.doWhilst(
        function(callback) {
            self.get('taobao.trades.sold.get', newParams, function(err, body) {
                if (err) return callback(err);
                if (body && body.trades_sold_get_response && body.trades_sold_get_response.trades && body.trades_sold_get_response.trades.trade) {
                    arr = arr.concat(body.trades_sold_get_response.trades.trade);
                }
                has_next = body.trades_sold_get_response.has_next;
                newParams.page_no++;
                callback(null, body);
            });
        },
        function() {
            return has_next;
        },
        function(err) {
            if (err) return cb(err);
            cb(null, arr);
        }
    );
}