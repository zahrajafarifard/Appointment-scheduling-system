import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";

import Modal from "../../shared/Modal";
import RequestType from "../requestType";
import { Logout } from "../../store/action";
import ReservedTurnsItems from "./reservedTurnsItems";

const Calendar = () => {
  const token = useSelector((state) => state.reducer.token);
  const customerId = useSelector((state) => state.reducer.customerId);
  const [dateField, setDateField] = useState(moment());
  const [slots, setSlots] = useState();
  const [allAlreadyturnsReserved, setAllAlreadyturnsReserved] = useState([]);
  const [turnChanged, setTurnChanged] = useState(false);
  const [getNewTurnAfterTurnChange, setGetNewTurnAfterTurnChange] =
    useState(true);

  const [request, setRequest] = useState();
  const [requestType, setRequestType] = useState();
  const [quantity, setQuntity] = useState();
  const [showModal, setShowModal] = useState(false);

  const [dirty, setDirty] = useState(false);
  const [valid, setValid] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  // if alert show up or not

  const [msgResponse, setMsgResponse] = useState("");
  // contain the message of alert

  const [confirmMessage, setConfirmMessage] = useState(false);
  // this state is for the color of alert , false => red , true => green

  const [reservedSlotId, setReservedSlotId] = useState(); //not yet reserved
  // contain the slotId

  // const [reserved, setReserved] = useState(); //already reserved
  const [reserved, setReserved] = useState([]); //already reserved
  // contain reserved slot by customer to show the their slot in green on loading

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeHandler = () => {
    setShowModal(false);
  };
  const confirmHandler = () => {
    setShowModal(false);
    submitBtnHandler(false); // false ==> don't navigate to info page
  };
  const rejectHandler = () => {
    setShowModal(false);
    submitBtnHandler(true); // true ==> navigate to info page
  };

  const submitHandler = () => {
    setShowModal(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setShowConfirm(false);
    }, 5000);
  }, [showConfirm]);

  useEffect(() => {
    // console.log("dateField", dateField);
    if (customerId) {
      fetch(
        `${process.env.REACT_APP_URL}/queue/timeSlotId/${customerId}/${moment(
          dateField
        ).format("YYYY-MM-DD")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            return new Error(`error ${response.status} occured...`);
          }
          return response.json();
        })
        .then((res) => {
          setReserved(res.timeSlotIds);
        })
        .catch((err) => console.log(err));
    }
  }, [customerId, token, dateField, setDateField, reservedSlotId, setReserved]);

  const logOutHandler = () => {
    dispatch(Logout());
    navigate("/");
  };

  const changeQueueHandler = async (e, _CId, _reserved, _requestTypeId) => {
    e.preventDefault();
    let response;
    try {
      response = await fetch(
        `${process.env.REACT_APP_URL}/queue/${_CId}/${_reserved}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            requestTypeId: _requestTypeId,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
    const data = await response.json();

    if (response.status === 403) {
      setShowConfirm(true);
      setConfirmMessage(false);
      setMsgResponse("برای امروز نوبت رزرو نکرده اید");
    }
    if (!response.ok) {
      return new Error(`error ${response.status} occured...`);
    }
    if (response.ok) {
      setTurnChanged(true);
      setGetNewTurnAfterTurnChange(false);

      const _remainingReservedIds = reserved.filter((item) => {
        if (item != data.id) {
          return item;
        }
      });

      const _remainingReservedTurns = allAlreadyturnsReserved.filter((item) => {
        if (item.RequestTypeId != _requestTypeId) {
          return item;
        }
      });

      setReserved(_remainingReservedIds);
      setAllAlreadyturnsReserved(_remainingReservedTurns);
    }
  };

  const submitBtnHandler = async (value) => {
    let response;
    try {
      response = await fetch(
        `${process.env.REACT_APP_URL}/timeSlot/reserve/${reservedSlotId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            request,
            requestType,
            quantity,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
    const slots = await response.json();

    if (response.status === 403) {
      // console.log(slots.msg);
      setShowConfirm(true);
      setConfirmMessage(false);
      setMsgResponse("پر کردن فیلدهاالزامی است");
    }

    if (!response.ok) {
      return new Error(`error ${response.status} occured...`);
    }

    setShowConfirm(true);
    setConfirmMessage(true);
    setMsgResponse("اطلاعات با موفقیت ثبت شد");
    value &&
      navigate(`/info?timeSlot=${slots.slots.id},${reserved}`, {
        replace: true,
      });
  };

  const changeDateHandler = async (date) => {
    setDateField(date);
    fetch(
      `${process.env.REACT_APP_URL}/timeSlot/${moment(date).format(
        "YYYY-MM-DD"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          return new Error(`error ${response.status} occured...`);
        }
        return response.json();
      })
      .then((slots) => {
        setSlots(slots.slots);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        submitHandler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [submitHandler, setReserved]);

  const DirtyValidHandler = (dirtyValue, validValue) => {
    setDirty(dirtyValue);
    setValid(validValue);
  };
  const requestPropHandler = (value) => {
    setRequest(value);
  };
  const requestTypePropHandler = (value) => {
    setRequestType(value);
  };
  const quantityPropHandler = (value) => {
    setQuntity(value);
  };

  useEffect(() => {
    //show all already reserved turns by customer
    if (reserved && customerId) {
      fetch(`${process.env.REACT_APP_URL}/timeSlot/customerId/${customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          timeSlot: reserved,
          date: dateField,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return new Error(`error ${response.status} occured...`);
          }
          return response.json();
        })
        .then((res) => {
          setAllAlreadyturnsReserved(res.fetchData);
        })
        .catch((err) => console.log(err));
    }
  }, [
    customerId,
    reserved,
    setReserved,
    setAllAlreadyturnsReserved,
    showModal,
    showConfirm,
  ]);

  useEffect(() => {
    if (dateField) {
      changeDateHandler(dateField);
    }
  }, [setSlots, reserved, setReserved, reservedSlotId, dateField]);

  useEffect(() => {
    changeDateHandler(dateField);
  }, [
    setSlots,
    turnChanged,
    setTurnChanged,
    reserved,
    setReserved,
    getNewTurnAfterTurnChange,
    setGetNewTurnAfterTurnChange,
    setAllAlreadyturnsReserved,
  ]);

  return (
    <div
      style={{ fontFamily: "IranSansWeb" }}
      className="mx-auto  mt-14 mb-28 screen700:justify-center relative w-[58%] screen800:w-[80%] px-4 "
    >
      <div className="flex ">
        <div
          className="w-16  my-2 text-center rounded-2xl bg-[#0a1c54] text-white font-bold p-1 text-[13px]
          caret-transparent cursor-pointer
          screen430:text-[10px] screen430:w-12 screen430:pb-1
          "
          onClick={logOutHandler}
        >
          خروج
        </div>
      </div>
      <RequestType
        requestProp={requestPropHandler}
        requestTypeProp={requestTypePropHandler}
        quantityProp={quantityPropHandler}
        DirtyValid={DirtyValidHandler}
      />

      <div className="text-[#0a1c54] text-justify   ">
        <div style={{ direction: "rtl" }} className="screen550:mt-28">
          <span className="font-bold text-[14px] screen430:text-[12px]">
            برای رزرو نوبت ابتدا بر روی ساعت مورد نظر کلیک کرده سپس دکمه تایید
            را بزنید
          </span>
        </div>

        <div
          className="flex flex-row-reverse my-12  screen500:my-6 screen550:text-center justify-center
        screen550:mt-5 "
        >
          <span
            style={{ direction: "rtl" }}
            className="font-bold text-[#0a1c54]  text-[14px] ml-3 mt-1
            screen430:text-[12px] screen430:ml-1  "
          >
            تاریخ رزرو
          </span>

          <DatePicker
            className="border-2 w-28 px-2  rounded-2xl  text-center  caret-transparent cursor-pointer font-bold  border-[#0a1c54]
            screen430:w-24 screen430:text-[14px] "
            persianDigits={true}
            value={dateField}
            onChange={(value) => changeDateHandler(value)}
            isGregorian={false}
            timePicker={false}
          />
        </div>
        {slots?.length === 0 && (
          <div
            style={{ direction: "rtl" }}
            className="text-center text-[#ed1c24] font-semibold py-3"
          >
            {dateField < moment()
              ? "تاریخ منقضی شده است"
              : "  در حال حاضر برای این تاریخ باز ه ی زمانی وجود ندارد"}
          </div>
        )}
        <div
          className="grid grid-cols-9 gap-x-1 gap-y-4 caret-transparent
        screen1360:grid-cols-7
        screen1000:grid-cols-6
        screen950:grid-cols-5
        screen700:grid-cols-4 
        screen550:grid-cols-3
        screen340:text-[12px]
        "
        >
          {slots?.map((slot) => {
            let x = new Date(slot.startTime);
            return (
              <div
                onClick={() => {
                  setReservedSlotId(slot.id);
                }}
                className={`w-20   border-2 border-[#0a1c54] rounded-2xl text-center font-bold  hover:bg-[#0ab954]
                  hover:cursor-pointer
                  screen430:w-[70px]
                  screen340:w-[60px]
                  ${slot.id === reservedSlotId && "bg-[#0ab954]"} 
                  ${x < new Date() && "bg-gray-400 pointer-events-none "}
                  ${reserved.map((item) => {
                    if (item == slot.id) {
                      const element = document.getElementById(item);
                      if (element) {
                        x < new Date()
                          ? (element.style.backgroundColor = "bg-gray-400")
                          : (element.style.backgroundColor = "#0ab954");
                      } else {
                        element &&
                          (element.style.backgroundColor = "bg-green-100");
                      }
                    }
                  })} 
                  
                  ${slot.active === false && "pointer-events-none"}
                  ${
                    slot.active === false &&
                    slot.id === reserved &&
                    "bg-[#0ab954]"
                  }
                  ${
                    slot.id === reservedSlotId &&
                    turnChanged &&
                    getNewTurnAfterTurnChange &&
                    "bg-white"
                  }
                  ${
                    slot.active === false &&
                    slot.id !== reserved &&
                    "bg-[#ed1c24] pointer-events-none hover:cursor-not-allowed hover:bg-[#ed1c24]"
                  }
                  `}
                key={slot.id}
                id={slot.id}
              >
                {
                  x
                    .toLocaleTimeString(navigator.language, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .split(" ")[0]
                }
              </div>
            );
          })}
        </div>
        <div className="flex flex-row justify-between mt-12">
          <div className="my-auto ">
            <button
              className="w-16  text-center rounded-2xl bg-[#0a1c54] text-white font-bold py-0.5
              caret-transparent cursor-pointer mt-6
              screen550:mt-0
              screen430:text-[12px] screen430:w-14 screen430:pb-1
              disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white
              "
              onClick={submitHandler}
              disabled={!reservedSlotId || !dirty || !valid}
            >
              تایید
            </button>
            {showConfirm && (
              <div
                className={`absolute -z-10 text-white
                text-right -mt-7 py-1 px-2 rounded-2xl text-[13.5px] font-bold
                ${
                  confirmMessage
                    ? "bg-[#0ab954] w-60 screen550:w-[200px] screen550:text-[10px] screen550:py-[6px] screen950:w-[230px] screen950:text-[12px] screen950:py-[5.5px] screen430:py-[6.5px]"
                    : "bg-[#ed1c24] w-[230px] screen950:w-[200px] screen950:text-[11px] screen950:py-[5.5px]    screen550:py-[6px] screen430:py-[6.5px]"
                }
                `}
              >
                {msgResponse}
              </div>
            )}
          </div>

          <div
            style={{ direction: "rtl" }}
            className="screen550:absolute screen550:top-[240px]  screen550:right-[85px] 
        screen430:top-[225px] screen430:right-[35px] screen340:top-[235px] "
          >
            <div
              className=" text-right rounded-2xl mb-2 text-[#0a1c54]  font-bold py-1
        caret-transparent cursor-pointer
        screen550:text-[12px]
        "
              onClick={logOutHandler}
            >
              راهنمای جدول
            </div>
            <div className="grid grid-cols-4 gap-4 screen340:gap-1">
              <span className="w-14 rounded-2xl  bg-[#0ab954] px-2 py-2 screen430:w-12 screen340:w-9 " />
              <span className="w-14 rounded-2xl bg-red-600 px-2 py-2 screen430:w-12 screen340:w-9 " />
              <span className="w-14 rounded-2xl border-2 border-[#0a1c54] px-2 py-2 screen430:w-12 screen340:w-9 " />
              <span className="w-14 rounded-2xl  bg-[#858996] px-2 py-2 screen430:w-12 screen340:w-9 " />
            </div>
            <div className="grid grid-cols-4 gap-4 screen340:gap-1 text-[10px] font-bold text-center my-1">
              <span className="screen500:text-[8px] screen340:text-[7px]">
                نوبت شما
              </span>
              <span className="screen500:text-[8px] screen340:text-[7px]">
                نوبت ناموجود
              </span>
              <span className="screen500:text-[8px] screen340:text-[7px]">
                نوبت موجود
              </span>
              <span className="screen500:text-[8px] screen340:text-[7px]">
                منقضی شده
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" text-center mt-10">
        <div className="text-[#0a1c54] my-4 font-semibold">
          نوبت های رزرو شده
        </div>
        {(allAlreadyturnsReserved?.length == 0 ||
          allAlreadyturnsReserved == undefined) && (
          <div className="text-center text-[#ed1c24] font-semibold py-3 border rounded-lg">
            ...نوبت رزرو نکرده اید
          </div>
        )}
        {allAlreadyturnsReserved?.map((item) => {
          return (
            <ReservedTurnsItems
              key={item.id}
              changeQueue={changeQueueHandler}
              item={item}
            />
          );
        })}
      </div>
      <div className=" fixed top-[200px] left-[33%] screen600:left-[25%] screen500:left-[22%]  ">
        {showModal && (
          <Modal
            body={"field6"}
            closeHandler={closeHandler}
            confirmHandler={confirmHandler}
            rejectHandler={rejectHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
