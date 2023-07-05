const dayjs = require("dayjs");

function parseTime(time) {
  console.log("TIME: ", time);
  const [hours, minutes] = time.split(":");
  return new Date(0, 0, 0, hours, minutes);
}

function isTimeBetween(startTime, endTime, currentTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const current = parseTime(currentTime);

  return start <= current && current <= end;
}

const isOpen = (hours) => {
  console.log("HOURS: ", hours);
  const currentTime = dayjs(
    new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  ).format("HH:mm");
  return isTimeBetween(hours.open, hours.close, currentTime);
};

module.exports = isOpen;
