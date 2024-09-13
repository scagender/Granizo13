const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const app = new Koa();
const router = new Router();

// Definir rutas
router.get('/', async ctx => {
  ctx.body = 'Ruta principal de la API';
});

router.get('/saludo', async ctx => {
  ctx.body = '¡Hola desde la API Koa!';
});

app.use(cors());

// Usar el router en la app
app.use(router.routes()).use(router.allowedMethods());

app.use((ctx, next) => {
  ctx.body = 'Hola Mundo';
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Koa corriendo en http://localhost:${port}`);
});