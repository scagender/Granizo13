import React from 'react';
import './OrderTable.css';

function DataTable({}) {

  // hacer un fetch data en esta linea y luego hacer un map de los datos para mostrarlos en la tabla

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
          <tr>
            <td>{"Test date"}</td>
            <td>{"Test id"}</td>
            <td>{"SKU: Amount"}</td>
            <td>{"Status"}</td>
            <td>{"More..."}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;