//Pop-up with details (orders, waiter, guests)
import React, { useState } from "react";
import { createPortal } from "react-dom";


function TableDetails ({table, onClose, updateWaiter, updateTableStatus}){
    const [selectedWaiter, setSelectedWaiter] = useState(table.waiter || "None");
    const [selectedStatus, setSelectedStatus] = useState(table.status);

    const handleWaiterChange = (event)=>{
        setSelectedWaiter(event.target.value);
    }

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleClose =()=>{
        updateWaiter(table.id, selectedWaiter);
        updateTableStatus(table.id, selectedStatus);
        onClose();
    }

    if (!table) return null;

    return createPortal(
        <div className="modal">
            <div className="modal-content">
                <button onClick={handleClose} className="secondary close">Save & Close</button>

                <div className="divGeneral">
                    <h2>Table {table.id} Details</h2>
                    <p>Status: <strong>{table.status.toUpperCase()}</strong></p>
                    <p>Guests: <strong>{table.guests > 0 ? table.guests : "Not Specified"}</strong></p>
                </div>

                <div className="divReservation">
                    {table.reservation && (
                    <>
                        <h3>Reservation Info</h3>
                        <p>Name: {table.reservation.name}</p>
                        <p>Time: {table.reservation.time}</p>
                        <p>Contact: {table.reservation.phone}</p>
                        <p>Email: {table.reservation.email}</p>
                    </>
                    )}
                </div>
                
                <div className="divStatus">
                    <h3>Update Table Status</h3>
                    <select value={selectedStatus} onChange={handleStatusChange}>
                        <option value="free">Free</option>
                        <option value="taken">Taken</option>
                        <option value="reserved">Reserved</option>
                    </select>
                </div>
                
                <div className="divWaiter">
                    <h3>Assign Waiter</h3>
                    <select value={selectedWaiter} onChange={handleWaiterChange}>
                        <option value="None">None</option>
                        <option value="Emily">Emily</option>
                        <option value="John">John</option>
                        <option value="Sophia">Sophia</option>
                    </select>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default TableDetails;