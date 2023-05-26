import React, { useState } from "react";

type Props = {};

const BannerDevelopment = (props: Props) => {
  const [isClosed, setIsClosed] = useState(false);
  return (
    !isClosed && (
      <div className="bg-red-900 text-white flex flex-col items-center relative p-1">
        <h4 className="font-semibold">Development/Preview Mode</h4>
        <p className="text-sm">All records are temporarily saved.</p>
        <button
          onClick={() => setIsClosed(true)}
          className="absolute top-1/2 right-5 -translate-y-1/2"
        >
          <i
            className="fa-solid fa-xmark"
            onClick={() => setIsClosed(true)}
          ></i>
        </button>
      </div>
    )
  );
};

export default BannerDevelopment;
