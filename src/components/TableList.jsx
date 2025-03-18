
function TableList({ tables, reservations, setSelectedReservation, clearTable, setAssignTable }) {
    return (
        <div className="table-grid">
        {tables.map((table) => {
            const reservation = reservations.find(res => res.assignedTable === table.id);

            return (
            <div key={table.id} className={`table-card ${table.status}`}>
                <h3>Table {table.id}</h3>
                <p>Status: <strong>{table.status.toUpperCase()}</strong></p>
                <p>Guests: <strong>{table.guests > 0 ? table.guests : "Not Specified"}</strong></p>
                {table.beenHereSince && <p>Been Here Since: {table.beenHereSince}</p>}

                {reservation && (
                <button onClick={() => setSelectedReservation(reservation)}>View Reservation</button>
                )}

                {table.status !== "free" && (
                <button onClick={() => clearTable(table.id)}>Clear Table</button>
                )}

                {table.status === "free" && (
                <button onClick={() => setAssignTable(table)}>Assign Walk-in Guests</button>
                )}
            </div>
            );
        })}
        </div>
    );
}

export default TableList;