import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors'
import router from './routes';

const app = new Koa();

app.use(cors({
	origin:'*'
}));
app.use(bodyParser())
router.map((el) => {
	app.use(el.routes())
	.use(el.allowedMethods());
})
app.listen(3000);

