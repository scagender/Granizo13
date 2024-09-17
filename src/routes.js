const Router = require('@koa/router');
const router = new Router();

const orders = require('./routes/orders');


router.get('/', async ctx => {
  ctx.body = 'Ruta principal de la API';
});

router.use('/orders', orders.routes());


module.exports = router;