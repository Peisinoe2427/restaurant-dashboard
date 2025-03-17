export const getCurrentTime = () => {
    const now = new Date();
    return now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
};

export const calculateEndTime = (startTime) => {
    if (!startTime) return null;
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(hours, minutes + 150);
    return endTime.toTimeString().substring(0, 5);
};

export const updateTablesWithReservations = (tables, reservations) => {
    return tables.map((table) => {
        const matchingReservation = reservations.find(
        (res) => res.assignedTable === table.id && res.time === getCurrentTime()
        );

        if (matchingReservation) {
        return {
            ...table,
            status: "taken",
            beenHereSince: getCurrentTime(),
            willBeFreeAt: calculateEndTime(getCurrentTime()),
        };
        }
        return table;
    });
};