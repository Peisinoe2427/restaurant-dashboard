// Displays all tables (status, quick actions)

import React, { useState } from "react";
import tablesData from "../data/tablesData";
import TableDetails from "./TableDetail";
import ReservationForm from "./ReservationForm"

function TableOverview() {
  const [tables, setTables] = useState(tablesData);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);

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

  const addReservation = (tableId, reservationDetails) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? { ...table, status: "reserved", reservation: reservationDetails, guests: reservationDetails.guests || 0, }
          : table
      )
    );
  };

  return (
    <div>
      <h2>Table Overview</h2>

      <button onClick={() => setShowReservationForm(true)}>Make a Reservation</button>

      <div className="table-grid">
        {tables.map((table) => (
          <div key={table.id} className={`table-card ${table.status}`}>
            <h3>Table {table.id}</h3>
            <p>Status: <strong>{table.status.toUpperCase()}</strong></p>
            <p>Waiter: {table.waiter || "None Assigned"}</p>
            <p>Guests: <strong>{table.guests > 0 ? table.guests : "Not Specified"}</strong></p>

            {table.reservation && (
              <>
                <p>Reserved for: {table.reservation.name}</p>
                <p>Time: {table.reservation.time}</p>
              </>
            )}

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

      {showReservationForm && (
        <ReservationForm
          tables={tables}
          onClose={() => setShowReservationForm(false)}
          addReservation={addReservation}
        />
      )}
    </div>
  );
}

export default TableOverview;
