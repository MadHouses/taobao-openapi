var _ = require("underscore");
var request = require("request");
var md5 = require("md5");
var moment = require("moment");
var qs = require('querystring');

module.exports = Taobao;

/**
 * default configuration
 */

var cfg = {
    debug: false,
    https: false,
    path: '/router/rest',
    httpRealHost: 'http://gw.api.taobao.com',
    httpSandHost: 'http://gw.api.tbsandbox.com',
    httpsRealHost: 'https://eco.taobao.com',
    httpsSandHost: 'https://gw.api.tbsandbox.com',
    format: "json",
    v: "2.0"
};

/**
 * api client constructor
 *
 * @param {Object} config
 * @constructor
 */

function Taobao(config) {
    this.config = {};
    _.extend(this.config, cfg, config);
}

/**
 * reset the config
 *
 * @param {Object} config
 */

Taobao.prototype.configure = function (config) {
    _.extend(this.config, config);
    return this;
};

/**
 * wrapping get request
 *
 * @param {String} method
 * @param {Object} [config]
 * @param {Object} args
 * @param {Function} callback
 */

Taobao.prototype.get = function () {

    // variable length arguments
    var method = "";
    var config = {};
    var args = {};
    var callback;
    if (arguments.length == 3) {
        method = arguments[0];
        args = arguments[1];
        callback = arguments[2];
    } else if (arguments.length == 4) {
        method = arguments[0];
        config = arguments[1] || {};
        args = arguments[2];
        callback = arguments[3];
    }

    _.extend(args, {method: method});

    // store private configuration in private_cfg
    var private_cfg = {};
    _.extend(private_cfg, this.config, config);
    var format_args = formatArgs(args, private_cfg);

    var host = this.config.debug ?
        (this.config.https ? this.config.httpsSandHost : this.config.httpSandHost) :
        (this.config.https ? this.config.httpsRealHost : this.config.httpRealHost);

    var uri = host + this.config.path + "?" + format_args;
    var option = {
        method: "GET",
        uri: uri
    };
    request(option, function (error, response, body) {
        if (error) {
            return callback(error);
        }
        callback(null, body);
    });
};

/**
 * wrapping post request
 *
 * @param {String} method
 * @param {Object} [config]
 * @param {Object} args
 * @param {Function} callback
 */

Taobao.prototype.post = function () {

    //variable length arguments
    var method = "";
    var config = {};
    var args = {};
    var callback;
    if (arguments.length == 3) {
        method = arguments[0];
        args = arguments[1];
        callback = arguments[2];
    } else if (arguments.length == 4) {
        method = arguments[0];
        config = arguments[1] || {};
        args = arguments[2];
        callback = arguments[3];
    }

    _.extend(args, {method: method});

    // store private configuration in private_cfg
    var private_cfg = {};
    _.extend(private_cfg, this.config, config);
    formatArgs(args, private_cfg);

    var host = this.config.debug ?
        (this.config.https ? this.config.httpsSandHost : this.config.httpSandHost) :
        (this.config.https ? this.config.httpsRealHost : this.config.httpRealHost);

    var uri = encodeURI(host + this.config.path);
    request.post(uri, {form: args}, function (error, response, body) {
        if (error) {
            return callback(error);
        }
        callback(null, body);
    });
};


/**
 * private function
 * format Args and sign it
 * return the query string
 *
 * @param {Object} args
 * @param {Object} config
 * @return {String} formated args
 */

function formatArgs(args, config) {

    args.timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
    args.format = config.format;
    args.v = config.v;
    args.sign_method = "md5";
    args.app_key = config.app_key;
    if(config.session){
        args.session = config.session;
    }

    args.sign = signArgs(args, config);
    return qs.stringify(args);
}

/**
 * private function
 * sign the Args encrypted by md5
 *
 * @param {Object} args
 * @param {Object} config
 * @return {String} signed args
 */

function signArgs(args, config) {

    var argsArr = [];
    for (var arg in args) {
        argsArr.push(arg + args[arg]);
    }

    return md5(config.app_secret + argsArr.sort().join('') + config.app_secret).toUpperCase();
}