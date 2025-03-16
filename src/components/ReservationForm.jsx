// Add, move, or cancel reservations

import React, { useState } from "react";
import { createPortal } from "react-dom";

function ReservationForm({ tables, onClose, addReservation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [numPeople, setNumPeople] = useState(1);

  if (!tables) {
    console.error("Error: tables is undefined in ReservationForm");
    return null; 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !phone || !time || !selectedTable || numPeople < 1) {
      alert("Please fill in all fields.");
      return;
    }

    const reservationDetails = {
      name,
      phone,
      time,
      guests: parseInt(numPeople, 10),
    };

    addReservation(parseInt(selectedTable), reservationDetails);
    onClose();
  };

  return createPortal(
    <div className="modal">
        <div className="modal-content">
            <h2>Make a Reservation</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Phone:
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </label>
                <label>
                    Time:
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </label>
                <label>
                    Number of People: {}
                    <input
                        type="number"
                        value={numPeople}
                        onChange={(e) => setNumPeople(e.target.value)}
                        min="1"
                        required
                    />
                </label>
                <label>
                    Select Table:
                    <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} required>
                      <option value="">-- Choose a Table --</option>
                      {tables
                        .filter((table) => table.status === "free")
                        .map((table) => (
                          <option key={table.id} value={table.id}>
                            Table {table.id}
                          </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Reserve</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ReservationForm;