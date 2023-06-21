import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { HoursApi } from "../../api/hoursApi";
import { isOpen } from "../../utils/isOpen";

const FoodHeader = () => {
  const [storeHours, setStoreHours] = useState(null);
  let storeIsOpen = null;
  useEffect(() => {
    (async () => {
      const currentTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      const formattedTime = dayjs(currentTime).format("YYYY-MM-DD");
      const foundHours = await HoursApi.getDailyHours(formattedTime);
      setStoreHours(foundHours);
    })();
  }, []);
  if (storeHours) {
    storeIsOpen = isOpen(storeHours);
    if (import.meta.env.VITE_NODE_ENV === "preview") {
      storeIsOpen = true;
    }
  }
  return (
    <header className="p-3 border-b">
      <h2 className="font-semibold">China Garden</h2>
      <p>Big Pine Shopping</p>
      {typeof storeIsOpen == "boolean" ? (
        storeIsOpen ? (
          <p className="text-green-700">We Are Open</p>
        ) : (
          <p className="text-red-700">We Are Closed</p>
        )
      ) : (
        <p></p>
      )}
      {/* {!isRestaurantOpen && <p className="text-danger">The restaurant is currently closed. We are open Monday to Saturday, from 11:00 AM to 9:30 PM (Florida time).</p>} */}
    </header>
  );
};

export default FoodHeader;
