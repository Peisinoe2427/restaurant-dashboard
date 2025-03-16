// Displays all tables (status, quick actions)

import React, { useState, useEffect } from "react";
import { tablesData, reservationsData } from "../data/tablesData";
import TableDetails from "./TableDetail";
import ReservationForm from "./ReservationForm";
import Sidebar from "./Sidebar";
import AssignWalkInForm from "./AssignWalkInForm";

function TableOverview() {
  const [tables, setTables] = useState(tablesData);
  const [reservations, setReservations] = useState(reservationsData);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [assignTable, setAssignTable] = useState(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
  };

  const calculateEndTime = (startTime) => {
    if (!startTime) return null;
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(hours, minutes + 150);
    return endTime.toTimeString().substring(0, 5);
  };

  const assignReservationToTable = (reservation) => {
    const availableTable = tables.find((table) => table.status === "free");
    if (!availableTable) {
      alert("No free tables available!");
    return;
  }

  setTables((prevTables) =>
    prevTables.map((table) =>
      table.id === availableTable.id
        ? {
            ...table,
            status: "taken",
            guests: reservation.guests,
            beenHereSince: getCurrentTime(),
            willBeFreeAt: calculateEndTime(getCurrentTime()),
          }
        : table
    )
  );

  setReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.id === reservation.id ? { ...res, assignedTable: availableTable.id } : res
      )
    );
  };

  const assignGuestsToTable = (tableId, numGuests, assignedWaiter) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              status: "taken",
              guests: numGuests,
              waiter: assignedWaiter,
              beenHereSince: getCurrentTime(),
            }
          : table
      )
    );
    setAssignTable(null);
  };

  const updateTableStatus = (tableId, newStatus) => {
  setTables((prevTables) =>
    prevTables.map((table) => {
      if (table.id === tableId) {

        return {
          ...table,
          status: newStatus,
          guests: newStatus === "free" ? 0 : table.guests, 
          waiter: newStatus === "free" ? null : table.waiter, 
          beenHereSince: newStatus === "free" ? null : table.beenHereSince, 
          willBeFreeAt: newStatus === "free" ? null : table.willBeFreeAt, 
        };
      }
      return table;
    })
  );
};

  const updateWaiter = (tableId, newWaiter) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? { ...table, waiter: newWaiter }
          : table
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTables((prevTables) =>
        prevTables.map((table) => {
          const matchingReservation = reservations.find(
            (res) => res.assignedTable === table.id && res.time === getCurrentTime()
          );

          if (matchingReservation) {
            return {
              ...table,
              status: "taken",
              beenHereSince: getCurrentTime(),
              willBeFreeAt: calculateEndTime(getCurrentTime()),
            };
          }
          return table;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, [reservations]);

  return (
    <div className="dashboard">
      <Sidebar reservations={reservations} assignReservationToTable={assignReservationToTable} />

      <div className="table-overview">
        <h2>Table Overview</h2>
        <button onClick={() => setShowReservationForm(true)}>Make a Reservation</button>

        <div className="table-grid">
          {tables.map((table) => (
            <div key={table.id} className={`table-card ${table.status}`}>
              <h3>Table {table.id}</h3>
              <p>Status: <strong>{table.status.toUpperCase()}</strong></p>
              <p>Guests: <strong>{table.guests > 0 ? table.guests : "Not Specified"}</strong></p>
              {table.beenHereSince && <p>Been Here Since: {table.beenHereSince}</p>}

              {table.status === "free" && (
                <button onClick={() => setAssignTable(table)}>Assign Walk-in Guests</button>
              )}

              <button onClick={() => setSelectedTable(table)}>View Details</button>
            </div>
          ))}
        </div>
      </div>


      {selectedTable && (
        <TableDetails
          table={selectedTable}
          onClose={() => setSelectedTable(null)}
          updateWaiter={updateWaiter}
          updateTableStatus={updateTableStatus}
        />
      )}
      {showReservationForm && <ReservationForm tables={tables} onClose={() => setShowReservationForm(false)} />}
        {assignTable && <AssignWalkInForm table={assignTable} onClose={() => setAssignTable(null)} assignGuestsToTable={assignGuestsToTable} />}
    </div>
  );
}

export default TableOverview;
