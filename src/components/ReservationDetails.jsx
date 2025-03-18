
function ReservationDetails ({reservation, onClose}){
    if (!reservation) return null;

    return (
        <dialog className="modal">
            <div className="modal-content">
                <button onClick={onClose} className="secondary close">Close</button>

                <h2>Reservation Details</h2>
                <p><strong>Name:</strong> {reservation.name}</p>
                <p><strong>Time:</strong> {reservation.time}</p>
                <p><strong>Guests:</strong> {reservation.guests}</p>
                <p><strong>Contact:</strong> {reservation.phone}</p>
                <p><strong>Email:</strong> {reservation.email}</p>
            </div>
        </dialog>
    );
}

export default ReservationDetails;