import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';

const app = new Koa();


app.use(bodyParser())
router.map((el) => {
	app.use(el.routes())
	.use(el.allowedMethods());
})
app.listen(3000);

