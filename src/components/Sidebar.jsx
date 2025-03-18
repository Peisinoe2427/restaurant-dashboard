function Sidebar({ reservations,  setReservations, tables, setTables }) {
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
                    beenHereSince: new Date().toLocaleTimeString(),
                    willBeFreeAt: new Date(Date.now() + 150 * 60000).toLocaleTimeString(),
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

    return (
    <div className="sidebar">
        <h2>Reservations</h2>

        {reservations.map((res) => (
            res.assignedTable ? null : (
                <div key={res.id} className="reservation-card">
                    <p><strong>{res.name}</strong></p>
                    <p>Time: {res.time}</p>
                    <p>Guests: {res.guests}</p>
                    {res.assignedTable ? (
                    <p>Table: {res.assignedTable}</p>
                    ) : (
                    <button onClick={() => assignReservationToTable(res)}>Assign to Table</button>
                    )}
                </div>
            )
        ))}
    </div>
    );
}

export default Sidebar;