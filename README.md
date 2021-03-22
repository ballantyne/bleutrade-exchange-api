[![Bleutrade](https://www.bleutrade.com/imgs/banners/728x90_bleutrade.gif)](https://bleutrade.com/sign_up/220918)

bleutrade-exchange-api
------------

This is a very simple api client that helps interact with the [Bleutrade](https://bleutrade.com/sign_up/220918) mining pool api.  

Installation
------------
```bash
npm install bleutrade-exchange-api --save
```

Usage
------------

```javascript

var options = {
  "key": "",
  "secret": ""
}

var Bleutrade = require('bleutrade-exchange-api');
var bleutrade = new Bleutrade(options);

bleutrade.getMarkets(function(err, data) {
  console.log(data);  
})
```




Contributing
------------

If you'd like to contribute a feature or bugfix: Thanks! To make sure your fix/feature has a high chance of being included, please read the following guidelines:

1. Post a [pull request](https://github.com/ballantyne/bleutrade-exchange-api/compare/).
2. Make sure there are tests! We will not accept any patch that is not tested.
   It's a rare time when explicit tests aren't needed. If you have questions
   about writing tests for paperclip, please open a
   [GitHub issue](https://github.com/ballantyne/bleutrade-exchange-api/issues/new).


And once there are some contributors, then I would like to thank all of [the contributors](https://github.com/ballantyne/bleutrade-exchange-api/graphs/contributors)!


License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Copyright
-------
© 2018 Scott Ballantyne. See LICENSE for details.
