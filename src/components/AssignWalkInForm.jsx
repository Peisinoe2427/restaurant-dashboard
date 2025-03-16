import React, { useState } from "react";
import { createPortal } from "react-dom";

function AssignWalkInForm({ table, onClose, assignGuestsToTable }) {
    const [numGuests, setNumGuests] = useState(1);
    const [selectedWaiter, setSelectedWaiter] = useState("None");

    const handleSubmit = (event) => {
    event.preventDefault();
    if (numGuests < 1) {
        alert("Number of guests must be at least 1.");
        return;
    }

    assignGuestsToTable(table.id, numGuests, selectedWaiter);
    onClose();
    };

    return createPortal(
    <div className="modal">
        <div className="modal-content">
            <h2>Assign Guests to Table {table.id}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                Number of Guests:
                <input type="number" value={numGuests} onChange={(e) => setNumGuests(parseInt(e.target.value))} min="1" required />
                </label>
                <label>
                Assign Waiter:
                <select value={selectedWaiter} onChange={(e) => setSelectedWaiter(e.target.value)}>
                    <option value="None">None</option>
                    <option value="Emily">Emily</option>
                    <option value="John">John</option>
                    <option value="Sophia">Sophia</option>
                </select>
                </label>
                <button type="submit">Assign Guests</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    </div>,
    document.getElementById("modal-root")
    );
}

export default AssignWalkInForm;