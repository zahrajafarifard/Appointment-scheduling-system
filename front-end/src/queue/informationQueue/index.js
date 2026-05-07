import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Logout } from "../../store/action";
import moment from "moment-jalaali";
import Spinner from "../../shared/spinner";

const InformationQueue = () => {
  const [reservedDate, setReservedDate] = useState([]);
  const [reservedData, setReservedData] = useState([]);
  // const [queueId, setQueueId] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  const _token = useSelector((state) => state.reducer.token);
  const _customerId = useSelector((state) => state.reducer.customerId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _timeSlot = searchParams.get("timeSlot");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/queue/customerId/${_customerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`,
      },
      body: JSON.stringify({
        timeSlot: _timeSlot,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(`error ${response.status} occured...`);
        }
        return response.json();
      })
      .then((res) => {
        setReservedData([
          res._customer[0].firstName,
          res._customer[0].lastName,
        ]);
        res.detailArray?.sort().map((item) => {
          setReservedDate((prev) => [...prev, item]);
        });
      })
      .catch((err) => console.log(err));
  }, [_customerId, setReservedDate, _token]);

  const logOutHandler = (e) => {
    dispatch(Logout());
    navigate("/");
  };

  const changeQueueHandler = async (e) => {
    navigate("/calendar");
  };

  if (reservedData === undefined || reservedDate === undefined) {
    return <Spinner />;
  }

  return (
    <div
      style={{ fontFamily: "IranSansWeb" }}
      className="font-face text-justify  mx-auto w-[640px]
    screen700:w-[97%]
    "
    >
      {reservedDate && reservedData && (
        <div
          className=" mt-28 rounded-xl p-8 text-[14px]
          text-justify  bg-[#0a1c54] text-white border-[#bd9d62]  border-4  caret-transparent
          screen700:p-0
          screen700:mt-18
          "
        >
          <div className="grid grid-cols-1 ">
            <div
              style={{ direction: "rtl" }}
              className=" p-14 text-justify
              screen500:py-10 screen500:px-6 screen430:text-[12px] screen340:px-[11px]
              "
            >
              <span className="">
                مشترک گرامی &nbsp;
                <span className="font-bold mx-2 ">
                  {reservedData[0]} {reservedData[1]}
                </span>
                <br />
              </span>
              نوبت (های) شما در تاریخ
              <span
                className="font-bold mx-1 mr-2 my-1
              screen550:mr-1
              "
              >
                {reservedDate?.map((date) => {
                  return (
                    <div key={moment(date).format("HH:mm")}>
                      <span className="mx-2">
                        {moment(date).format("jYYYY/jM/jD")}
                      </span>
                      <span>{moment(date).format("HH:mm")}</span>
                    </div>
                  );
                })}
              </span>
              با موفیقیت ثبت گردید لطفا در زمان مقرر در صرافی حضور به عمل رسانید
              .
              <div className="float-left mt-14 text-[#bd9d62] font-bold">
                با تشکر
                {/* <span className="leading-[3]  font-bold text-[#bd9d62] mr-1">
                    صرافی اریکه
                  </span> */}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex my-10">
        <button
          className="w-20 bg-[#0a1c54] text-sm font-bold text-center rounded-2xl py-1 text-white mr-2
          screen550:text-[13px]  screen550:w-[70px]
          screen430:text-[11px]  screen430:w-16

          "
          onClick={changeQueueHandler}
        >
          تغییر نوبت
        </button>
        <button
          className="w-44 bg-[#0ab954] text-sm font-bold text-center rounded-2xl py-1 text-white
          screen550:text-[13px]  screen550:w-[138px]
          screen430:text-[11px]  screen430:w-28
          "
          onClick={logOutHandler}
        >
          برگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default InformationQueue;
