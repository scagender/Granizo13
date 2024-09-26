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
    // Realiza una consulta básica para verificar si la base de datos está disponible
    return true; // Si la consulta es exitosa, la base de datos está bien
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    return false; // Si ocurre un error, significa que la base de datos no está accesible
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