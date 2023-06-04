import React from "react";
const BannerPhoneNumber = () => {
  return (
    <div className="bg-red-900 text-white flex flex-col items-center relative p-2">
      <p className="text-sm">
        To place order over the phone call{" "}
        <a
          href="tel:3058728861"
          className="font-semibold underline underline-offset-3"
        >
          (305) 872-8861
        </a>
      </p>
    </div>
  );
};

export default BannerPhoneNumber;
