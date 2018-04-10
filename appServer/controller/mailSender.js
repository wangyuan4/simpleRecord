import Router from 'koa-router';

const MailSender = require('../lib/mailDeliver');
const router = new Router();

const sendMail = async (ctx, next) => {
  const { from, to, content } = ctx.request.body

  if (!to) { throw new Error('没有收信人') }

  MailSender({
    to: to,
    subject: `来自${from}的分享`, // Subject line
    text: `${content}` // plain text body
  })

  ctx.body = {
    status: true,
    msg: 'ok'
  };

}

router.post('/api/sendmail', sendMail);

export default router

