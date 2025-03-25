
function ReservationDetails ({reservation, onClose}){
    if (!reservation) return null;

    return (
        <dialog className="modal">
            <div className="modal-content">
                <button onClick={onClose} className="secondary close">Close</button>

                <div>
                    <h2>Reservation Details</h2>
                    <ul>
                        <li><strong>Name:</strong> {reservation.name}</li>
                        <li><strong>Time:</strong> {reservation.time}</li>
                        <li><strong>Guests:</strong> {reservation.guests}</li>
                        <li><strong>Contact:</strong> {reservation.phone}</li>
                        <li><strong>Email:</strong> {reservation.email}</li>
                    </ul>
                </div>
                
            </div>
        </dialog>
    );
}

export default ReservationDetails;