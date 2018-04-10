import Router from 'koa-router';

const router = new Router();

const getNoteList = async (ctx, next) => {
  let articles = await ctx.knex.select('*').from('notes').orderBy('created_at');
  ctx.body = articles || [];
}

router.get('/api/notes', getNoteList);

export default router

