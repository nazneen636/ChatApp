import React from "react";

const Alert = ({ title }) => {
  return (
    <div
      class="p-4 mb-4 mr-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium"> </span> Currently you have no {title}
    </div>
  );
};

export default Alert;
