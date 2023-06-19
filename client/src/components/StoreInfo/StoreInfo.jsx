import React, { useState, useEffect } from "react";

const FoodHeader = () => {
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);

  useEffect(() => {
    let currentTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    let currentHour = new Date(currentTime).getHours();
    let currentDay = new Date(currentTime).getDay();
    let restaurantStartHour = 11; // Start hour of your restaurant
    let restaurantEndHour = 21.5; // End hour of your restaurant, 9:30 PM is 21.5 in 24 hour format
    let closedDay = 0; // Sunday

    if (
      currentHour < restaurantStartHour ||
      currentHour >= restaurantEndHour ||
      currentDay === closedDay
    ) {
      setIsRestaurantOpen(false);
    } else {
      setIsRestaurantOpen(true);
    }
  }, []);

  return (
    <header className="p-3 border-b">
      <h2 className="font-semibold">China Garden</h2>
      <p>Big Pine Shopping</p>
      <p>Open Six Days a week</p>
      {/* {!isRestaurantOpen && <p className="text-danger">The restaurant is currently closed. We are open Monday to Saturday, from 11:00 AM to 9:30 PM (Florida time).</p>} */}
    </header>
  );
};

export default FoodHeader;
