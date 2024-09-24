const Router = require('@koa/router');
const router = new Router();    
const { 
    getItemStock, 
    getExpiringItems, 
    getAvailableStorage
     } = require('../controllers/metrics_controller');

router.get('/item-stock', async (ctx) => {
    try {
        getItemStock(ctx);
    } catch (error) {
        ctx.status = 400;
        ctx.json({ error: error.message });
    }
});

router.get('/expiring-items', async (ctx) => {
    try {
        getExpiringItems(ctx);
    } catch (error) {
        ctx.status = 400;
        ctx.json({ error: error.message });
    }
});

router.get('/available-storage', async (ctx) => {
    try {
        getAvailableStorage(ctx);
    } catch (error) {
        ctx.status = 400;
        ctx.json({ error: error.message });
    }
});