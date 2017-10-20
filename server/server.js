require('ignore-styles');
require('babel-register');

const express = require('express');
const logger = require('morgan');
const Promise = require('bluebird');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { setCacheStrategy } = require('rapscallion');
const isoMiddleware = require('./middleware/iso');

// Set up Express + Redis
// *****************************************************************************
const app = express();
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
});
const redisGet = Promise.promisify(redisClient.get, { context: redisClient });
const redisSet = Promise.promisify(redisClient.set, { context: redisClient });
setCacheStrategy({ // Global Singleton for Rapscallion
  get: key => redisGet(key).then(val => (val && JSON.parse(val)) || null),
  set: (key, val) => redisSet(key, JSON.stringify(val)),
});

// Middleware
// *****************************************************************************
app.use(helmet());
app.use(express.static('./build'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(isoMiddleware);


app.listen(process.env.PORT || 8001);
console.log('Launched Successfully');
console.log('Go to http://localhost:8001');
module.exports = app;
