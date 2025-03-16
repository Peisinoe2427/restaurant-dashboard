// Pre set tables with status and reservations

const tablesData = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  status: "free", 
  guests: 0,
  waiter: null,
  beenHereSince: null,
  willBeFreeAt: null,
}));

const reservationsData = [
  { id: 1, name: "John Doe", time: "19:00", guests: 4, phone: "123-456-7890", email: "john@example.com", assignedTable: null },
  { id: 2, name: "Emma Smith", time: "20:30", guests: 2, phone: "987-654-3210", email: "emma@example.com", assignedTable: null },
];

export { tablesData, reservationsData };
