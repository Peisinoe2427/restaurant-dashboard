import  { useState } from "react";
import { tablesData, reservationsData } from "../data/tablesData";
import ReservationDetails from "./ReservationDetails";
import ReservationForm from "./ReservationForm";
import Sidebar from "./Sidebar";
import AssignWalkInForm from "./AssignWalkInForm";
import TableList from "./TableList";
import OrderForm from "./OrderForm";

function Dashboard() {
  const [tables, setTables] = useState(tablesData);
  const [reservations, setReservations] = useState(reservationsData);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [assignTable, setAssignTable] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [activeTable, setActiveTable] = useState(null);

  
    const saveOrderToTable = (tableId, order) => {
      setTables((prevTables) =>
        prevTables.map((table) =>
        table.id === tableId
          ? { ...table, order: order.items, total: order.total }
          : table
        )
      );
      setActiveTable(null);
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
              total: 0,
              order: null
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
          setActiveTable={setActiveTable}
        />
      </div>

      {showReservationForm && (
        <ReservationForm 
          onClose={() => setShowReservationForm(false)} 
          setReservations={setReservations} 
        />
      )}

      {selectedReservation && (
        <ReservationDetails
          reservation={selectedReservation}
          onClose={() => setSelectedReservation(null)}
        />
      )}

      {assignTable && (
        <AssignWalkInForm 
          table={assignTable} 
          onClose={() => setAssignTable(null)} 
          setTables={setTables} 
        />
      )}

      {activeTable && (
        <OrderForm
          onClose={() => setActiveTable(null)}
          saveOrder={(order) => saveOrderToTable(activeTable, order)}
        />
      )}

    </div>
  );
}

export default Dashboard;
