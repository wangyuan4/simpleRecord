import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import convert from 'koa-convert';
import cors from 'koa2-cors';
import websockify from 'koa-websocket';
import router from './routes';

const knex = require('./lib/knex');
const config = require('./config');
const app = websockify(new Koa());

app.use(cors({
	origin:'*'
}));

// app.use(knex(config.mysql));
// app.use(bodyparser);

app.use(bodyparser())

// app.ws.use(require('koa-static')(__dirname + './../webApp/dist'));
app.use(require('koa-static')(__dirname + './../webApp/dist'));

router.map((el) => {
	app.use(el.routes())
	.use(el.allowedMethods());
})

// 用npm run start
module.exports = app;
// app.listen(config.port);
console.log('server is listening on port', config.port)

