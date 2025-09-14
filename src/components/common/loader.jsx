import React from "react";

const Loader = ({ size = "8", color = "blue-600" }) => {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-gray-200 border-t-${color} rounded-full animate-spin`}
    />
  );
};

export default Loader;
