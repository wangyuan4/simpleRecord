const Koa = require('koa');
const app = new Koa();

const bodyparser = require('koa-bodyparser')();
// const router = require('koa-router')();
const convert = require('koa-convert');
const config = require('./config');
const views = require('koa-views');
const json = require('koa-json');

const knex = require('./lib/knex');

// const api = require('./routes/api');
const routes = require('./api')
const response_formatter = require('./middlewares/response_formatter');

// middlewares
app.use(knex(config.mysql));

app.use(convert(bodyparser));
app.use(convert(json()));
app.use(response_formatter('^/api'));
app.use(require('koa-static')(__dirname + '../webApp/dist'));

// app.use(require('koa-static')(__dirname + '/client/dist'));
// router.use('/api', api.routes(), api.allowedMethods());

app.use(routes.routes(), routes.allowedMethods());

module.exports = app;
