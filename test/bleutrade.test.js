var path    = require('path');
var mockery = require('mockery');
var should  = require('chai').should();
var request = require('request-mockery');
var assert  = require('assert');
var _       = require('underscore');
const url   = require('url');
const querystring = require('querystring');

describe('Bleutrade', function() {
    var Bleutrade, keys;
    before(function(){
      mockery.enable({
	warnOnReplace: false,
	warnOnUnregistered: false,
	useCleanCache: true
      });
      // request.verbosity(true)
      mockery.registerMock('request', request);
      keys = {
        "key": "test",
        "secret": "test"
      }
      Bleutrade = require(path.join(__dirname, '..', 'index'));
      
    });

  after(function(){
    mockery.disable();
  }); 

  describe('Public', function() {
    it('getmarkets', function(done) {
      
      var bleutrade = new Bleutrade(keys)
      bleutrade.getMarkets(function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://bleutrade.com/api/v2/public/getmarkets')
        done();
      })
    });
    it('getcurrencies', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getCurrencies(function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://bleutrade.com/api/v2/public/getcurrencies')
        done();
      })
    });
    it('getticker', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getTicker(function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://bleutrade.com/api/v2/public/gettickers')
        done();
      })
    });
    it('getmarketsummaries', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getMarketSummaries(function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://bleutrade.com/api/v2/public/getmarketsummaries')
        done();
      })
   
    });
    it('getmarketsummary', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getMarketSummary({market: 'ETH-BTC'}, function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://bleutrade.com/api/v2/public/getmarketsummary?market=ETH-BTC')
        done();
      })   
    });
    it('getorderbook', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getOrderbook({market: 'ETH-BTC'}, function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://bleutrade.com/api/v2/public/getorderbook?market=ETH-BTC')
        done();
      })   
    });
    it('getmarkethistory', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getMarketHistory({market: 'ETH-BTC'}, function(err, result) {
        assert.equal(result.method, 'GET');
        assert.equal(result.url, 'https://bleutrade.com/api/v2/public/getmarkethistory?market=ETH-BTC')
        done();
      })   
    });
  });

  describe('Market', function() {
    it('buylimit', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.buy({market: 'ETH-BTC', quantity: 1, rate: 0.115}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/market/buylimit')
        assert.equal(parsed.query.market, 'ETH-BTC');
        assert.equal(parsed.query.quantity, '1');
        assert.equal(parsed.query.rate, '0.115');
        assert.equal(parsed.query.apikey, 'test');       
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      })   
    });
    it('selllimit', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.sell({market: 'ETH-BTC', quantity: 1, rate: 0.115}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/market/selllimit')
        assert.equal(parsed.query.market, 'ETH-BTC');
        assert.equal(parsed.query.quantity, '1');
        assert.equal(parsed.query.rate, '0.115');
        assert.equal(parsed.query.apikey, 'test');       
 
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      })   
    });
    it('cancel', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.cancel({uuid: 'test'}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/market/cancel')
        assert.equal(parsed.query.uuid, 'test');
        assert.equal(parsed.query.apikey, 'test');       
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      })   
    });
    it('getopenorders', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getOpenOrders(function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/market/getopenorders')
        assert.equal(parsed.query.apikey, 'test');       
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      })   
    });
  
  });

  describe('Account', function() {
    it('getbalances', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getBalances(function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.query.apikey, 'test');              
        assert.equal(parsed.url.pathname, '/api/v2/account/getbalances')
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      })   
    });
    it('getbalance', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getBalance({currency: 'ETH'}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/account/getbalance')       
        assert.equal(parsed.query.currency, 'ETH');
        assert.equal(parsed.query.apikey, 'test');              
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      })   
    });
    it('getdepositaddress', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getDepositAddress({currency: 'ETH'}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/account/getdepositaddress')       
        assert.equal(parsed.query.currency, 'ETH');
        assert.equal(parsed.query.apikey, 'test');              
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      })  
      
    });
    it('withdraw', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.withdraw({currency: 'ETH', quantity: 1, address: 'test_address'}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/account/withdraw')       
        assert.equal(parsed.query.currency, 'ETH');
        assert.equal(parsed.query.quantity, '1');
        assert.equal(parsed.query.address, 'test_address');  
        assert.equal(parsed.query.apikey, 'test');       
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      }) 
    });
    it('getorder', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getOrder({uuid: 'test'}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/account/getorder')       
        assert.equal(parsed.query.uuid, 'test');
        assert.equal(parsed.query.apikey, 'test');       
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      }) 
    });
    it('getorders', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getOrders({
        market: 'test', 
        orderstatus: 'ALL', 
        ordertype: 'SELL', 
        depth: 555
      }, function(err, result) {
      
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/account/getorders')       
        assert.equal(parsed.query.market, 'test');
        assert.equal(parsed.query.orderstatus, 'ALL');       
        assert.equal(parsed.query.ordertype, 'SELL');      
        assert.equal(parsed.query.depth, '555');      
        assert.equal(parsed.query.apikey, 'test');               
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      }) 
    });
    it('getorderhistory', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getOrderHistory({market: 'test'}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/account/getorderhistory')       
        assert.equal(parsed.query.market, 'test');
        assert.equal(parsed.query.apikey, 'test');       
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      }) 
    });
    it('getwithdrawalhistory', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getWithdrawalHistory({currency: 'test'}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/account/getwithdrawalhistory')       
        assert.equal(parsed.query.currency, 'test');
        assert.equal(parsed.query.apikey, 'test');       
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      }) 
    });
    it('getdeposithistory', function(done) {
      var bleutrade = new Bleutrade(keys)
      bleutrade.getDepositHistory({currency: 'test'}, function(err, result) {
        assert.equal(result.method, 'GET');
        var parsed = {};
        parsed.url = url.parse(result.url);
        parsed.query = querystring.parse(parsed.url.query);
        assert.equal(parsed.url.pathname, '/api/v2/account/getdeposithistory')       
        assert.equal(parsed.query.currency, 'test');
        assert.equal(parsed.query.apikey, 'test');       
        assert.equal(_.first(_.keys(result.headers)), 'apisign');
        done();
      }) 
    });










  });
});



