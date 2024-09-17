const Koa = require('koa');
const cors = require('@koa/cors');
const router = require('./routes');

const PORT = process.env.PORT || 8080;

const app = new Koa();

app.use(router.routes());

// Definir rutas
// router.get('/', async ctx => {
//   ctx.body = 'Ruta principal de la API';
// });

router.get('/saludo', async ctx => {
  ctx.body = '¡Hola desde la API Koa!';
});

app.use(cors());

// Usar el router en la app
// app.use(router.routes()).use(router.allowedMethods());

// app.use((ctx, next) => {
//   ctx.body = 'Hola Mundo';
// });

const server = app.listen(PORT, () => {
  console.log(`Servidor Koa corriendo en http://localhost:${PORT}`);
});

module.exports = { app, server };
