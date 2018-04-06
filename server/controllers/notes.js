const router = require('koa-router')();

const getNoteList = async (ctx, next) => {
  let articles = await ctx.knex.select('*').from('notes').orderBy('created_at');
  ctx.body = articles || [];
}

router.get('/notes', getNoteList);

module.exports = router;
