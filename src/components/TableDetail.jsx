//Pop-up with details (orders, waiter, guests)
import React, { useState } from "react";
import { createPortal } from "react-dom";


function TableDetails ({table, onClose, updateWaiter}){
    const [selectedWaiter, setSelectedWaiter] = useState(table.waiter || "None");

    const handleWaiterChange = (event)=>{
        setSelectedWaiter(event.target.value);
    }

    const handleClose =()=>{
        updateWaiter(table.id, selectedWaiter);
        onClose();
    }

    if (!table) return null;

    return createPortal(
        <div className="modal">
            <div className="modal-content">
                <h2>Table {table.id} Details</h2>
                <p>Status: <strong>{table.status.toUpperCase()}</strong></p>
                <p>Guests: {table.guests}</p>
                
                {table.reservation && (
                <>
                    <h3>Reservation Info</h3>
                    <p>Name: {table.reservation.name}</p>
                    <p>Time: {table.reservation.time}</p>
                    <p>Contact: {table.reservation.phone}</p>
                </>
                )}

                <h3>Assign Waiter</h3>
                <select value={selectedWaiter} onChange={handleWaiterChange}>
                    <option value="None">None</option>
                    <option value="Emily">Emily</option>
                    <option value="John">John</option>
                    <option value="Sophia">Sophia</option>
                </select>

                <h3>Special Requests</h3>
                <p>None yet</p>

                <button onClick={handleClose} className="secondary">Close</button>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default TableDetails;