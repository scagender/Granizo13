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
    const { id, dueDate, order } = ctx.request.body; // Asegúrate de que el cuerpo esté definido
     console.log('Request Body:', ctx.request.body);
     const orderStatus = 'aceptado'; // Puedes establecer un estado inicial si lo deseas

    // Validación básica
    if (!id || !dueDate || !order) {
        ctx.status = 400; // Bad Request
        ctx.body = { error: 'Missing required fields or incorrect format.' };
        return;
    }

    try {
        // Crear pedidos en la base de datos
        for (const item of order) {
            const { sku, quantity } = item;
            
            // Puedes agregar aquí más validaciones para sku y quantity si es necesario

            // Crear un nuevo registro en la base de datos
            await Order.create({
                orderId: id, // Puedes considerar si deseas que este id se use como referencia
                sku: sku,
                quantity: quantity,
                status: orderStatus, // Puedes establecer un estado inicial si lo deseas
                receivedAt: dueDate, // Fecha de recepción actual
            });

            try {
                const response = await axios.post('http://localhost:8080/api/coffeshop/products', {
                    sku,
                    quantity,
                    id
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                console.log('Product created:', response.data);
            } catch (error) {
                console.error('Error creating product:', error.response ? error.response.data : error.message);
            }
        }

        // Respuesta exitosa
        ctx.status = 201; // Created
        ctx.body = { status: orderStatus };

        
    } catch (error) {
        console.error(error);
        ctx.status = 500; // Internal Server Error
        ctx.body = { error: 'An error occurred while creating orders.' };
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