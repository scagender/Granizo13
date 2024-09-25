import React from 'react';
import './Metrics.css';
import { useEffect, useState } from 'react';

function Metrics() {
    const [storageFull, setStorageFull] = useState([]);
    const [stock, setStock] = useState([]);
    const [ordersPerHour, setOrdersPerHour] = useState([]);
    const [expiringProducts, setExpiringProducts] = useState([]);

    // Reemplazar con el fetch real
    useEffect(() => {
        const data = {
            storageFull: [{name: "Storage 1", stock: "100%"}, {name: "Storage 2", stock: "50%"}],
            stock: [{name: "Product 1", stock: "100"}, {name: "Product 2", stock: "50"}],
            ordersPerHour: "10",
            expiringProducts: "5"
        };
        setStorageFull(data.storageFull);
        setStock(data.stock);
        setOrdersPerHour(data.ordersPerHour);
        setExpiringProducts(data.expiringProducts);
        console.log(data);
    }, []);

    return (
        <div className="metrics-container">
            <div className="metric">
                <h2>Storage full</h2>
                <ul>
                    {storageFull.map(storage => (
                        <li>
                            <p>{storage.name}</p>
                            <p>{storage.stock}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="metric">
                <h2>Stock</h2>
                <ul>
                    {stock.map(product => (
                        <li>
                            <p>{product.name}</p>
                            <p>{product.stock}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="metric">
                <h2>Orders per hour</h2>
                <p>{ordersPerHour}</p>
            </div>
            <div className="metric">
                <h2>Expiring products</h2>
                <p>{expiringProducts}</p>
            </div>
        </div>
    );
}
      
export default Metrics;

