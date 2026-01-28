import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
