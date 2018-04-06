const router = require('koa-router')();

import notes from '../controllers/notes'

const routes = [
  notes
]

routes.map(
  r => router.use('/api', r.routes(), r.allowedMethods())
)
// router.use('/users', user_router.routes(), user_router.allowedMethods());
module.exports = router;
