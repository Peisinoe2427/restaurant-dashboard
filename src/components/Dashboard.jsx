import React, { useState, useEffect } from "react";
import { tablesData, reservationsData } from "../data/tablesData";
import { updateTablesWithReservations } from "../utility";
import ReservationDetails from "./ReservationDetails";
import ReservationForm from "./ReservationForm";
import Sidebar from "./Sidebar";
import AssignWalkInForm from "./AssignWalkInForm";
import TableList from "./TableList";

function TableOverview() {
  const [tables, setTables] = useState(tablesData);
  const [reservations, setReservations] = useState(reservationsData);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [assignTable, setAssignTable] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);


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
    setTables((prevTables) => updateTablesWithReservations(prevTables, reservations));
  }, 60000);

  return () => clearInterval(interval);
}, [reservations]);

  return (
    <div className="dashboard">
      <Sidebar 
        reservations={reservations} 
        setReservations={setReservations} 
        tables={tables} 
        setTables={setTables} 
      />
      

      <div className="table-grid">
        <div>
          <h2>Table Overview</h2>
          <button onClick={() => setShowReservationForm(true)}>Make a Reservation</button>
        </div>
        
        <TableList
          tables={tables}
          reservations={reservations}
          setSelectedReservation={setSelectedReservation}
          clearTable={clearTable}
          setAssignTable={setAssignTable}
        />
      </div>


      {selectedReservation && (
        <ReservationDetails
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}

      {showReservationForm && (
        <ReservationForm 
          onClose={() => setShowReservationForm(false)} 
          setReservations={setReservations} 
        />
      )}

      {assignTable && (
        <AssignWalkInForm 
          table={assignTable} 
          onClose={() => setAssignTable(null)} 
          setTables={setTables} 
        />
      )}
    </div>
  );
}

export default TableOverview;
