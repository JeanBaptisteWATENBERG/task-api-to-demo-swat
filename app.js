'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    basic: (req, authOrSecDef, scopesOrApiKey, cb) => {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return cb(new Error('access denied !'));
      }

      const credentials = authorizationHeader.replace('Basic ', '');
      if (!credentials) {
        return cb(new Error('access denied !'));
      }

      const uncryptedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
      if (!uncryptedCredentials) {
        return cb(new Error('access denied !'));
      }

      const splittedCredentials = uncryptedCredentials.split(':');
      if (splittedCredentials.length !== 2 || splittedCredentials[0] === '') {
        return cb(new Error('access denied !'));
      }

      cb();
    }  
  }
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log('try this:\ncurl http://127.0.0.1:' + port + '/swagger');
});
