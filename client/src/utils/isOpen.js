import dayjs from "dayjs";

export const isOpen = (hours) => {
  console.log(hours);
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  console.log(currentTime);
};
