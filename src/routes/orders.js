const Router = require('@koa/router');
const router = new Router();
const { Order } = require('../models');
const {
    createOrder,
    getAllOrders,
    getOrdersByHour,
    getOrderData,
    receiveProducts
        } = require('../controllers/orders_controller');

router.post('/new', async (ctx) => {
    try {
        createOrder(ctx);
    } catch (error) {
        ctx.status = 400;
        ctx.json({ error: error.message });
    }
});

router.post('/', async (ctx) => {
    try {
        receiveProducts(ctx);
    } catch (error) {
        ctx.status = 400;
        ctx.json({ error: error.message });
    }
});

router.get('/', async (ctx) => {
    try {
        const orders = await Order.findAll({
            order: [['receivedAt', 'DESC']]
        });

        ctx.status = 200;
        ctx.body = orders;
    } catch (error) {
        ctx.status = 400;
        ctx.json({ error: error.message });
    }
});


router.get('/by-hour', async (ctx) => {
    try {
        getOrdersByHour(ctx);
    } catch (error) {
        ctx.status = 400;
        ctx.json({ error: error.message });
    }
});

// Más información de la orden
router.get('/:id', async (ctx) => {
    try {
        getOrderData(ctx);
    } catch (error) {
        ctx.status = 400;
        ctx.json({ error: error.message });
    }
});

module.exports = router;