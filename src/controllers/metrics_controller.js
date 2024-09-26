const getItemStock = async (req, res) => {
    try {
        res.status(200).json({ message: 'Item stock' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getExpiringItems = async (req, res) => {
    try {
        res.status(200).json({ message: 'Expiring items' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAvailableStorage = async (req, res) => {
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
      
          ctx.status = 200;
          ctx.body = formattedSpaces; // Devolver los espacios formateados
          console.log(formattedSpaces[0]);
          console.log(formattedSpaces[1]);
          console.log(formattedSpaces[2]);
          console.log(formattedSpaces[3]);
    } catch (error) {
        return null;
    }
}

module.exports = { getItemStock, getExpiringItems, getAvailableStorage };