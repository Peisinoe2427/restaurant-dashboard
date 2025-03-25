const tablesData = [2, 2, 2, 2, 4, 4, 4, 4].map((maxGuests, index)  => ({
  id: index + 1,
  status: "free", 
  guests: 0,
  waiter: null,
  beenHereSince: null,
  total: 0,
  order: null,
  maxGuests,
}));

const reservationsData = [
  { id: 1, name: "John Doe", time: "19:00", guests: 4, phone: "123-456-7890", email: "john@example.com", assignedTable: null },
  { id: 2, name: "Emma Smith", time: "20:30", guests: 2, phone: "987-654-3210", email: "emma@example.com", assignedTable: null },
];

export { tablesData, reservationsData };
