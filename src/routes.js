const Router = require('@koa/router');
const router = new Router();

const orders = require('./routes/orders');
const apiRoutes = require('./routes/api');
const { server } = require('./app');


router.get('/', async ctx => {
  ctx.body = 'Ruta principal de la API';
});

router.use('/orders', orders.routes());

router.use('/api', apiRoutes.routes());

async function checkDB(ctx) {
  try {
    return true;
  } catch (error) {
    ctx.status = 500;
  }
}

router.get('/health', async ctx => {
  const dbStatus = await checkDB(ctx);
  ctx.status = dbStatus? 200: 500;
  ctx.body = { 
    db: dbStatus? 'ok': 'error',
    server: 'ok'
  };  
});

module.exports = router;