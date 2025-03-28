import { useState } from "react";

function ReservationForm({ onClose, setReservations }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [celebration, setCelebration] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !phone || !email|| !time || numPeople < 1) {
      alert("Some fields are not filled in");
      return;
    }

    const newReservation = {
      id: Date.now(),
      name,
      phone,
      email,
      time,
      guests: parseInt(numPeople, 10),
      assignedTable: null, 
      celebration,
    };

    setReservations((prevReservations) => [...prevReservations, newReservation]);
    onClose();
  };

  return(
    <dialog className="modal">
        <div className="modal-content">
            <h2 className="titleForm">Make a Reservation</h2>
            <form onSubmit={handleSubmit} className="form__res">
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Phone:
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </label>
                <label>
                  Email:
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Time:
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </label>
                <label>
                    Number of People: {}
                    <input
                        type="number"
                        value={numPeople}
                        onChange={(e) => setNumPeople(e.target.value)}
                        min="1" max ="4"
                        required
                    />
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={celebration}
                    onChange={() => setCelebration(!celebration)}
                  /> 🎉 Is this a celebration?
                </label>
                <div className="container__button">
                  <button type="submit">Reserve</button>
                  <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
      </div>
    </dialog>
  );
}

export default ReservationForm;