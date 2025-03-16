// Displays all tables (status, quick actions)

import React, { useState, useEffect } from "react";
import { tablesData, reservationsData } from "../data/tablesData";
import ReservationDetails from "./ReservationDetails";
import ReservationForm from "./ReservationForm";
import Sidebar from "./Sidebar";
import AssignWalkInForm from "./AssignWalkInForm";

function TableOverview() {
  const [tables, setTables] = useState(tablesData);
  const [reservations, setReservations] = useState(reservationsData);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [assignTable, setAssignTable] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

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

  const addReservation = (newReservation) => {
    setReservations((prevReservations) => [
      ...prevReservations,
      { ...newReservation, id: prevReservations.length + 1, assignedTable: null },
    ]);
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

  const clearTable = (tableId) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              status: "free",
              guests: 0,
              waiter: null,
              beenHereSince: null,
              willBeFreeAt: null,
              }
          : table
      )
    );

    setReservations((prevReservations) =>
      prevReservations.map((res) =>
        res.assignedTable === tableId ? { ...res, assignedTable: null } : res
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
      

      <div className="table-grid">
        <div>
          <h2>Table Overview</h2>
          <button onClick={() => setShowReservationForm(true)}>Make a Reservation</button>
        </div>
        

        {tables.map((table) => {
          const reservation = reservations.find(res => res.assignedTable === table.id);
          return (
            <div key={table.id} className={`table-card ${table.status}`}>
              <h3>Table {table.id}</h3>
              <p>Status: <strong>{table.status.toUpperCase()}</strong></p>
              <p>Guests: <strong>{table.guests > 0 ? table.guests : "Not Specified"}</strong></p>
              {table.beenHereSince && <p>Been Here Since: {table.beenHereSince}</p>}

              {reservation && (
                <button onClick={() => setSelectedReservation(reservation)}>View Reservation</button>
              )}

              {table.status !== "free" && (
                <button onClick={() => clearTable(table.id)}>Clear Table</button>
              )}

              {table.status === "free" && (
                <button onClick={() => setAssignTable(table)}>Assign Walk-in Guests</button>
              )}
            </div>
          );
        })}
      </div>


      {selectedReservation && (
        <ReservationDetails
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}
      {showReservationForm && <ReservationForm tables={tables} onClose={() => setShowReservationForm(false)} addReservation={addReservation}/>}
      {assignTable && <AssignWalkInForm table={assignTable} onClose={() => setAssignTable(null)} assignGuestsToTable={assignGuestsToTable} />}
    </div>
  );
}

export default TableOverview;
