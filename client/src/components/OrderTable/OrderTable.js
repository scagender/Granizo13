import React from 'react';
import './OrderTable.css';
import { useEffect, useState } from 'react';


function DataTable() {

  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   fetch('https://api.example.com/orders')
  //     .then(response => response.json())
  //     .then(data => setOrders(data))
  //     .catch(error => console.error(error))
  // }, []);

  // REEMPLAZAR ESTO CON EL FETCH REAL
  useEffect(() => {
    const data = [
      {
        date: "2021-09-01 12:00",
        id: "123456",
        sku: "SKU: Amount",
        status: "Pending",
        more: "More..."
      },
      {
        date: "2021-09-01 12:00",
        id: "789012",
        sku: "SKU: Amount",
        status: "Shipped",
        more: "More..."
      }
    ];
    
    setOrders(data);
  }, []);

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha y hora del pedido</th>
            <th>Order id</th>
            <th>SKU/Amount</th>
            <th>Status</th>
            <th>More information</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr>
              <td>{order.date}</td>
              <td>{order.id}</td>
              <td>{order.sku}</td>
              <td>{order.status}</td>
              <td>{order.more}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;