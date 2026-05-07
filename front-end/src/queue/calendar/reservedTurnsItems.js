import React from "react";
import moment from "moment-jalaali";

const ReservedTurnsItems = ({ item, changeQueue }) => {
  return (
    <div
      style={{ direction: "rtl" }}
      className=" grid grid-cols-6 justify-between text-[#0a1c54] mx-auto py-1 border-[#0a1c54] border-2 rounded-lg px-2 text-xs w-full my-3
      screen550:grid-cols-3 screen470:text-[10px]
      "
    >
      <div className="my-auto ">
        {item?.Customer.firstName + " "}
        {item?.Customer.lastName}
      </div>
      <div className="my-auto screen550:hidden">
        {item?.request ? "خرید" : "فروش"}
      </div>
      <div className="my-auto screen550:hidden">{item?.quantity}</div>
      <div className="my-auto screen550:hidden">{item?.RequestType.name}</div>
      <div style={{ direction: "ltr" }} className="my-auto">
        {moment(item.TimeSlot.startTime).format("jYYYY/jM/jD hh:mm")}
      </div>
      <div className="my-auto ">
        <button
          className={`p-1 rounded-lg bg-[#0a1c54] text-white font-bold text-[10px] disabled:bg-[#858996] disabled:text-white `}
          disabled={
            moment(item?.TimeSlot.startTime).format("jYYYY/jM/jD HH:mm") <
            moment().format("jYYYY/jM/jD HH:mm")
          }
          onClick={(e) =>
            changeQueue(
              e,
              item?.CustomerId,
              item?.TimeSlotId,
              item?.RequestTypeId
            )
          }
        >
          تغییر / حذف
        </button>
      </div>
    </div>
  );
};

export default ReservedTurnsItems;
