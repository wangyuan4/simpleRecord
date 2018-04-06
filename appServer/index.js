import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import convert from 'koa-convert';
import cors from 'koa2-cors'

import router from './routes';

const knex = require('./lib/knex');
const config = require('./config');
const app = new Koa();

app.use(cors({
	origin:'*'
}));

app.use(knex(config.mysql));
// app.use(bodyparser);

app.use(bodyparser())

router.map((el) => {
	app.use(el.routes())
	.use(el.allowedMethods());
})
app.listen(config.port);
console.log('server is listening on port', config.port)

