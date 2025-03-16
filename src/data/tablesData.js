// Pre set tables with status and reservations

const tablesData = [
  {
    id: 1,
    status: "free", // "taken" or "reserved"
    guests: 0,
    reservation: null, // Stores reservation details if reserved
    waiter: null, // Assigned waiter
    beenHereSince: null, // Timestamp when seated
  },
  {
    id: 2,
    status: "reserved",
    guests: 4,
    reservation: {
      name: "John Doe",
      time: "19:00",
      phone: "123-456-7890",
      email: "john@example.com",
    },
    waiter: null,
    beenHereSince: null,
  },
  {
    id: 3,
    status: "taken",
    guests: 2,
    reservation: null,
    waiter: "Emily",
    beenHereSince: "18:30",
  },
  {
    id: 4,
    status: "free",
    guests: 0,
    reservation: null,
    waiter: null,
    beenHereSince: null,
  },
];

export default tablesData;
