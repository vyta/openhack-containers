'use strict';

var fs = require('fs');
var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');
var tediousExpress = require('express4-tedious');
var morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

// Configuration and potential overrides
function getConfigValue(name, defaultValue) {
    var value = "";

    if (process.env.CONFIG_VARIABLE_LOCATION) {
        var filePath = Path.join(process.env.CONFIG_VARIABLE_LOCATION, name);
        value = (fs.existsSync(filePath)) ? fs.readFileSync(filePath, 'utf8').trim() : defaultValue;
    } else {
        value = process.env[name] || defaultValue;
    }
    return value;
}
var port = process.env.PORT || 80;
var sqlUser = getConfigValue('SQL_USER', 'sqladmin');
var sqlPassword = getConfigValue('SQL_PASSWORD', '');
var sqlServer = getConfigValue('SQL_SERVER', '');
var sqlDBName = getConfigValue('SQL_DBNAME', 'mydrivingDB');

var App = Express();
var Server = Http.createServer(App);
var logger = morgan(':remote-addr [:date[web]] :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent :response-time ms');
App.use(logger);

var sqlConfig = {
    userName:   sqlUser,
    password:   sqlPassword,
    server:     sqlServer,
    options: {
        encrypt: true,
        database: sqlDBName,
        MultipleActiveResultSets: false,
        TrustServerCertificate: false,
        rowCollectionOnDone: true
    }
};
App.use(function (req, res, next) {
    req.sql = tediousExpress(sqlConfig);
    next();
});

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: true
}));

App.use(Swaggerize({
    api: Path.resolve('./config/swagger.json'),
    handlers: Path.resolve('./handlers')
}));
App.use('/api/docs/user', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

Server.listen(port, function () {
    App.swagger.api.host = this.address().address + ':' + this.address().port;
    /* eslint-disable no-console */
    console.log('App running on %s:%d', this.address().address, this.address().port);
    /* eslint-disable no-console */
});
