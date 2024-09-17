const Router = require('@koa/router');
const router = new Router();
const createOrder = require('../controllers/orders_controller');

router.post('/', async (ctx) => {
    try {
        createOrder(ctx);
    } catch (error) {
        ctx.status = 400;
        ctx.json({ error: error.message });
    }

});

module.exports = router;