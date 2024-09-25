import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Metrics.css';

function Metrics() {
    const [ordersPerHour, setOrdersPerHour] = useState(0);
    const [ordersPerDay, setOrdersPerDay] = useState(0);
    const [expiringProducts, setExpiringProducts] = useState([]);
    const [cafeteriaSpaces, setCafeteriaSpaces] = useState([]);
    const [totalStockBySKU, setTotalStockBySKU] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Petición POST para autenticación
                const authResponse = await axios.post('https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/auth', {
                    group: 13,
                    secret: 'tw9fzC!*n6&PgydV%u8N3LXAe_H?JYQ+',
                });

                const token = authResponse.data.token;

                // Obtener los espacios usando el token
                const spacesResponse = await axios.get('https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/spaces', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const spaces = spacesResponse.data;
                const stockBySKU = {};

                // Obtener el inventario de cada espacio
                await Promise.all(spaces.map(async (space) => {
                    const inventoryResponse = await axios.get(`https://prod.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/spaces/${space._id}/inventory`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    inventoryResponse.data.forEach(item => {
                        stockBySKU[item.sku] = (stockBySKU[item.sku] || 0) + item.quantity;
                    });
                }));

                setTotalStockBySKU(stockBySKU);

                // Uso de los espacios
                const formattedSpaces = spaces.map(space => ({
                    id: space._id,
                    usedSpace: `${space.usedSpace}/${space.totalSpace} (${((space.usedSpace / space.totalSpace) * 100).toFixed(2)}%)`,
                    details: Object.entries(space)
                        .filter(([key, value]) => key !== '_id' && key !== 'usedSpace' && key !== 'totalSpace')
                        .map(([key, value]) => `${key}: ${value}`).join(', ')
                }));
                setCafeteriaSpaces(formattedSpaces);
                
                // Productos expirando sin token
                const productResponse = await axios.get('https://dev.proyecto.2024-2.tallerdeintegracion.cl/coffeeshop/products/available');
                const expiringSoon = productResponse.data.filter(product => product.expiration <= 3);
                setExpiringProducts(expiringSoon);

                // Pedidos desde archivo JSON
                const ordersResponse = await axios.get('/orders.json');
                const orders = ordersResponse.data;
                const totalOrders = orders.length;
                const totalDays = new Set(orders.map(order => new Date(order.receivedAt).toDateString())).size;
                const ordersPerDayCalc = totalDays > 0 ? totalOrders / totalDays : 0;
                const ordersPerHourCalc = ordersPerDayCalc / 24;
                setOrdersPerDay(ordersPerDayCalc.toFixed(2));
                setOrdersPerHour(ordersPerHourCalc.toFixed(2));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="metrics-container">
            <div className="metric">
                <h2>Orders per day</h2>
                <p>{ordersPerDay}</p>
            </div>
            <div className="metric">
                <h2>Orders per hour</h2>
                <p>{ordersPerHour}</p>
            </div>
            <div className="metric">
                <h2>Expiring products</h2>
                <ul>
                    {expiringProducts.map(product => (
                        <li key={product.sku}>
                            <p>{product.name}</p>
                            <p>Expira en: {product.expiration} horas</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="metric">
                <h2>Cafeteria Spaces</h2>
                <ul>
                    {cafeteriaSpaces.map(space => (
                        <li key={space.id}>
                            <p>ID: {space.id}</p>
                            <p>Used Space: {space.usedSpace}</p>
                            <p>Details: {space.details}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="metric">
                <h2>Total Stock by SKU</h2>
                <ul>
                    {Object.entries(totalStockBySKU).map(([sku, quantity]) => (
                        <li key={sku}>
                            <p>SKU: {sku}</p>
                            <p>Quantity: {quantity}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
      
export default Metrics;
