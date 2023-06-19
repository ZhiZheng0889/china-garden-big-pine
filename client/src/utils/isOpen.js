import dayjs from "dayjs";

function parseTime(time) {
  const [hours, minutes] = time.split(":");
  return new Date(0, 0, 0, hours, minutes);
}

function isTimeBetween(startTime, endTime, currentTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const current = parseTime(currentTime);

  return start <= current && current <= end;
}

export const isOpen = (hours) => {
  const currentTime = dayjs(
    new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  ).format("HH:mm");
  return isTimeBetween(hours.open, hours.close, currentTime);
};
