function Sidebar({ reservations, assignReservationToTable }) {
    return (
        <div className="sidebar">
        <h3>Upcoming Reservations</h3>
        {reservations.length === 0 ? (
            <p>No reservations.</p>
        ) : (
            reservations.map((res) => (
            <div key={res.id} className="reservation-card">
                <p><strong>{res.name}</strong></p>
                <p>Time: {res.time}</p>
                <p>Guests: {res.guests}</p>
                <button onClick={() => assignReservationToTable(res)}>Assign to Table</button>
            </div>
            ))
        )}
        </div>
    );
}

export default Sidebar;