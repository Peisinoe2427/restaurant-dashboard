import { useState } from "react";

function AssignWalkInForm({ table, onClose, setTables }) {
    const [numGuests, setNumGuests] = useState(1);
    const [selectedWaiter, setSelectedWaiter] = useState("None");

    const handleSubmit = (event) => {
        event.preventDefault();
        const guestsNumber = parseInt(numGuests, 10);

        if (guestsNumber > table.maxGuests) {
            alert(`This table only seats up to ${table.maxGuests} guests.`);
            return;
        }

        setTables((prevTables) =>
            prevTables.map((t) =>
                t.id === table.id
                ? {
                    ...t,
                    status: "taken",
                    guests: guestsNumber,
                    waiter: selectedWaiter,
                    beenHereSince: new Date().toLocaleTimeString(),
                    }
                : t
            )
        );
        onClose();
    };

    return (
    <dialog className="modal">
        <div className="modal-content">
            <h2>Assign Walk-in Guests</h2>
            <form onSubmit={handleSubmit}>
                <label>Guests: <input type="number" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} min="1" max={table.maxGuests} required /></label>
                <label>Waiter:
                    <select value={selectedWaiter} onChange={(e) => setSelectedWaiter(e.target.value)}>
                        <option value="None">None</option>
                        <option value="Emily">Emily</option>
                        <option value="John">John</option>
                        <option value="Sophia">Sophia</option>
                    </select>
                </label>
                <div className="container__button">
                    <button type="submit">Assign</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    </dialog>
    );
}

export default AssignWalkInForm;