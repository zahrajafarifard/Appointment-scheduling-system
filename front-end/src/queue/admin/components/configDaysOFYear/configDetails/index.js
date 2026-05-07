import React from "react";
import moment from "moment-jalaali";

const ConfigDetails = ({ date, start, end, slotDuration }) => {
  const _startTime = new Date(start);

  const _endTime = new Date(end);

  return (
    <div
      style={{ direction: "rtl" }}
      className={`text-[12px]  border-2 p-2 my-5  border-[#ed1c24] rounded-3xl font-bold gap-20 
       place-items-center grid grid-cols-4
       `}
    >
      <span className="mr-2">{moment(date).format("jYYYY/jM/jD")}</span>

      <span className="">
        {
          _startTime
            .toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            })
            .split(" ")[0]
        }
      </span>
      <span className="">
        {
          _endTime
            .toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            })
            .split(" ")[0]
        }
      </span>
      <span className="">{slotDuration} </span>
    </div>
  );
};

export default ConfigDetails;
