const path          = require('path');
const _             = require('underscore');
const HTTP          = require(path.join(__dirname, 'http'));
const Signature     = require(path.join(__dirname, 'signature'));
var nonce           = require('nonce')();
const querystring   = require('querystring');

module.exports = HTTP.extend(function(options) {
  _.extend(this, options);
  this.api_endpoint = '/tapi/'
}).methods({

  url: function(method, query) {
    if (query == undefined) {
      query = {};
    }
    
    var u = [this.host, this.api_endpoint, method].join('')
    query.apikey = this.key;
    query.nonce = nonce();
    return [u,"?", querystring.stringify(query)].join('');
  },

  headers: function(url) {
    var signer = new Signature({key: this.key, secret: this.secret});
    return signer.sign(url);
  }  
}) 
