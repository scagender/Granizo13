const Router = require('@koa/router');
const router = new Router();    
const axios = require('axios');

const { 
    getItemStock, 
    getExpiringItems, 
    getAvailableStorage
     } = require('../controllers/metrics_controller');

router.get('/', async (ctx) => {
    ctx.body = 'Ruta principal de metrics';
});

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

router.get('/availableStorage', async (ctx) => {
    try {
        const authResponse = await axios.post('https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/auth', {
            group: 13,
            secret: 'tw9fzC!*n6&PgydV%u8N3LXAe_H?JYQ+',
        });
    
        const token = authResponse.data.token;
    
        // Petición GET para obtener los espacios usando el token
        const spacesResponse = await axios.get('https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/spaces', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const formattedSpaces = spacesResponse.data.map(space => ({
            id: space._id,
            cold: space.cold,
            kitchen: space.kitchen,
            checkIn: space.checkIn,
            checkOut: space.checkOut,
            buffer: space.buffer,
            totalSpace: space.totalSpace,
            usedSpace: space.usedSpace,
          }));

        // Guardar en kitchen la llave que tiene kitchen true
        const kitchen = formattedSpaces.find(space => space.kitchen === true);
        const checkIn = formattedSpaces.find(space => space.checkIn === true);
        const checkOut = formattedSpaces.find(space => space.checkOut === true);
        const buffer = formattedSpaces.find(space => space.buffer === true);
        const cold = formattedSpaces.find(space => space.cold === true);

        const kitchenUsedSpace = kitchen.usedSpace/ kitchen.totalSpace;
        const checkInUsedSpace = checkIn.usedSpace/ checkIn.totalSpace;
        const checkOutUsedSpace = checkOut.usedSpace/ checkOut.totalSpace;
        const bufferUsedSpace = buffer.usedSpace/ buffer.totalSpace;
        const coldUsedSpace = cold.usedSpace/ cold.totalSpace;

        ctx.body = {
            kitchen: {
                name: 'Cocina',
                usedSpace: kitchenUsedSpace
            },
            checkIn: {
                name: 'Bodega',
                usedSpace: checkInUsedSpace
            },
            checkOut: {
                name: 'Sector de retiro',
                usedSpace: checkOutUsedSpace
            },
            buffer: {
                name: 'Bodega externa',
                usedSpace: bufferUsedSpace
            },
            cold: {
                name: 'Bodega refrigerada',
                usedSpace: coldUsedSpace
            }
        }

        // Devolver los espacios con su nombre y capacidad utilizada
          ctx.status = 200;

    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

module.exports = router;
