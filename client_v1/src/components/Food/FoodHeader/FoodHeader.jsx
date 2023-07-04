import React, { useState, useEffect } from "react";
import Hours from "../../../api/Hours";
import dayjs from "dayjs";
import { isOpen } from "../../../utils/isOpen";

const FoodHeader = () => {
  const [storeHours, setStoreHours] = useState(null);
  let storeIsOpen = null;
  useEffect(() => {
    (async () => {
      const currentTime = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
      });
      const formattedTime = dayjs(currentTime).format("YYYY-MM-DD");
      const response = await Hours.getDailyHours(formattedTime);
      if (response.data) {
        setStoreHours(response.data);
      }
    })();
  }, []);
  if (storeHours) {
    storeIsOpen = isOpen(storeHours);
    if (import.meta.env.VITE_NODE_ENV === "development") {
      storeIsOpen = true;
    }
  }
  return (
    <header className="p-3 border-b">
      <h2 className="font-semibold">China Garden</h2>
      <p>209 Key Deer Blvd, Big Pine Key</p>
      {typeof storeIsOpen == "boolean" ? (
        storeIsOpen ? (
          <p className="text-green-700">We Are Open</p>
        ) : (
          <p className="text-red-700">We Are Closed</p>
        )
      ) : (
        <p></p>
      )}
    </header>
  );
};

export default FoodHeader;
