const Router = require('@koa/router');
const axios = require('axios');
const router = new Router();

// Function token
async function getToken() {
    const response = await axios.post('https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/auth', {
        group: 13,
        secret: 'tw9fzC!*n6&PgydV%u8N3LXAe_H?JYQ+',
    });
    return response.data.token;
}

// Productos que expirarán
router.get('/expiring-items', async (ctx) => {
    try {
        const token = await getToken();
        const response = await axios.get('https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/products/available', {
            headers: { Authorization: `Bearer ${token}` },
        });

        const expiringItems = response.data.filter(product => product.expiration <= 3);
        ctx.body = expiringItems.map(product => ({
            sku: product.sku,
            name: product.name,
            expiration: product.expiration
        }));
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

// total stock counts by SKU
router.get('/total-sku', async (ctx) => {
    try {
        const token = await getToken();
        const spacesResponse = await axios.get('https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/spaces', {
            headers: { Authorization: `Bearer ${token}` },
        });

        const inventoryCounts = {};
        await Promise.all(spacesResponse.data.map(async (space) => {
            const inventoryResponse = await axios.get(`https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/spaces/${space._id}/inventory`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            inventoryResponse.data.forEach(item => {
                inventoryCounts[item.sku] = (inventoryCounts[item.sku] || 0) + item.quantity;
            });
        }));

        ctx.body = inventoryCounts;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

// available storage
router.get('/available-storage', async (ctx) => {
    try {
        const token = await getToken();
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

        // Calculate and format used space
        const spacesWithUsage = formattedSpaces.map(space => ({
            ...space,
            usedSpace: `${space.usedSpace}/${space.totalSpace} (${((space.usedSpace / space.totalSpace) * 100).toFixed(2)}%)`
        }));

        ctx.body = spacesWithUsage;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

module.exports = router;
