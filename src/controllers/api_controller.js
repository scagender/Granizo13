const axios = require('axios');

async function receiveProducts(ctx) {
    try {
        // Petición POST para autenticación
        const authResponse = await axios.post('https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/auth', {
            group: 13,
            secret: 'str1ng.Super$ecreto',
        });

        const token = authResponse.data.token;
        console.log(token);

        // Petición GET para obtener los espacios usando el token
        const spacesResponse = await axios.get('https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/spaces', {
            headers: {
                Authorization: `Bearer `,
            },
        });

        ctx.status = 200;
        ctx.body = spacesResponse.data; // Devolver los espacios obtenidos
        console.log(spacesResponse.data);

    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message }; // Manejo de errores
    }
}

module.exports = {
    receiveProducts,
};