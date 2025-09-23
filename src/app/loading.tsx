import React from "react";

export default function loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100 flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
}
