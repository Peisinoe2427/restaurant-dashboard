// Add, move, or cancel reservations

import React, { useState } from "react";
import { createPortal } from "react-dom";

function ReservationForm({ onClose, addReservation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [numPeople, setNumPeople] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !phone || !email|| !time || numPeople < 1) {
      alert("Please fill in all fields.");
      return;
    }

    const reservationDetails = {
      name,
      phone,
      email,
      time,
      guests: parseInt(numPeople, 10),
    };

    addReservation(reservationDetails);
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
                  Email:
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
                <button type="submit">Reserve</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ReservationForm;