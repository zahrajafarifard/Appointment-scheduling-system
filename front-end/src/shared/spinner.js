import React from "react";

const Spinner = ({width , height}) => {
  return (
    <div className="flex justify-center items-center  pt-[10%]">
        <div className={`w-${width ? width : '20'} h-${height ? height : '20'} border-l-2 border-gray-400 rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;
