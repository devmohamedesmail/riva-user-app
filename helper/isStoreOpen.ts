export const isStoreOpen = (startTime: string, endTime: string) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    // handle overnight stores (ex: 10 PM → 3 AM)
    if (end < start) {
        return currentTime >= start || currentTime <= end;
    }

    return currentTime >= start && currentTime <= end;
};