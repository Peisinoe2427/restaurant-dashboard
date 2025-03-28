function Sidebar({ reservations,  setReservations, tables, setTables }) {
    const assignReservationToTable = (reservation) => {
        const availableTable = tables.find(
            (tableItem) => tableItem.status === "free" && tableItem.maxGuests >= reservation.guests
        );
        if (!availableTable) {
            alert("Congrats, all your tables are filled, sorry new guest, time to wait...");
            return;
        }
        setTables((prevTables) =>
            prevTables.map((table) =>
            table.id === availableTable.id
                ? {
                    ...table,
                    status: "taken",
                    guests: reservation.guests,
                    beenHereSince: new Date().toLocaleTimeString(),
                }
                : table
            )
        );
        setReservations((prevReservations) =>
            prevReservations.map((updatedRes) =>
            updatedRes.id === reservation.id ? { ...updatedRes, assignedTable: availableTable.id } : updatedRes
            )
        );
    };

    return (
    <div className="sidebar">
        <h2>Reservations</h2>

        {reservations
            .filter((res) => !res.assignedTable)
            .map((res) => (
                <div key={res.id} className="reservation-card">
                    <p><strong>{res.name}</strong></p>
                    <p>Time: {res.time}</p>
                    <p>Guests: {res.guests}</p>
                    <button onClick={() => assignReservationToTable(res)}>Assign to Table</button>
                </div>
            ))
        }
    </div>
    );
}

export default Sidebar;