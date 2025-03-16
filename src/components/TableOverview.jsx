// Displays all tables (status, quick actions)

import React, { useState } from "react";
import tablesData from "../data/tablesData";
import TableDetails from "./TableDetail";

function TableOverview() {
  const [tables, setTables] = useState(tablesData);
  const [selectedTable, setSelectedTable] = useState(null);

  const updateWaiter = (tableId, newWaiter)=>{
    setTables((prevTables) => {
      return prevTables.map((table) =>
        table.id === tableId ? { ...table, waiter: newWaiter } : table
      );
    });
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId ? { ...table, status: newStatus } : table
      )
    );
  };

  return (
    <div>
      <h2>Table Overview</h2>
      <div className="table-grid">
        {tables.map((table) => (
          <div key={table.id} className={`table-card ${table.status}`}>
            <h3>Table {table.id}</h3>
            <p>Status: <strong>{table.status.toUpperCase()}</strong></p>
            <p>Waiter: {table.waiter || "None Assigned"}</p>
            {/* {table.status === "reserved" && <p>Reserved for: {table.reservation.name}</p>}
            {table.status === "taken" && <p>Guests: {table.guests}</p>} */}

            <button className="primary" onClick={() => setSelectedTable(table)}>View Details</button>
          </div>
        ))}
      </div>

      {selectedTable && (
        <TableDetails 
          table={selectedTable} 
          onClose={() => setSelectedTable(null)} 
          updateWaiter={updateWaiter}
          updateTableStatus={updateTableStatus}
          />
      )}
    </div>
  );
}

export default TableOverview;
