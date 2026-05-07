import React, { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "moment-jalaali";

import closeBtn from "../../../../assets/images/close icone-01.svg";
import ConfigDetails from "./configDetails";

const initialState = [
  {
    startHour: "",
    startMinute: "",

    endHour: "",
    endMinute: "",

    year: "",
    month: "",
    day: "",

    persons: "",
    slotDuration: "",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "Change":
      return state.map((data) => {
        return { ...data, [action.name]: action.value };
      });

    default:
      return state;
  }
};

const ConfigDaysOFYear = () => {
  const [inputValue, dispatch] = useReducer(reducer, initialState);

  const [typeConfirmBox, setTypeConfirmBox] = useState(false); //true --> green for status 200 , red --> false for status 422
  const [confirmBoxMsg, setConfirmBoxMsg] = useState("");

  const [token, setToken] = useState(
    useSelector((state) => state.adminReducer.token)
  );

  const _token = useSelector((state) => state.adminReducer.token);
  const [showConfig, setShowConfig] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "all",
  });
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    startHour: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    startMinute: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    endHour: {
      required: "فیلد  نمی تواند خالی باشد ",
    },

    persons: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    slotDuration: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    year: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    month: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    day: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setConfirmBoxMsg("");
    }, 4000);
  }, [confirmBoxMsg]);

  const submitHandler = async (event) => {
    event.preventDefault();
    let response, data;
    try {
      response = await fetch(
        `${process.env.REACT_APP_URL}/admin/config-days-Of-year`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            startHour: getValues("startHour"),
            startMinute: getValues("startMinute"),
            endHour: getValues("endHour"),
            endMinute: getValues("endMinute"),
            persons: getValues("persons"),
            slotDuration: getValues("slotDuration"),
            year: getValues("year"),
            month: getValues("month"),
            day: getValues("day"),
          }),
        }
      );
      data = await response.json();
    } catch (error) {
      console.log(error);
    }

    if (response.status === 422) {
      setConfirmBoxMsg(data.msg);
      setTypeConfirmBox(false);
    }
    if (response.ok) {
      setConfirmBoxMsg(data.msg);
      setTypeConfirmBox(true);
    }

    if (!response.ok) {
      return new Error(`error ${response.status} occured...`);
    }
  };

  const changeHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    dispatch({ type: "Change", name, value });
  };

  const confirmHandler = () => {
    setConfirmBoxMsg("");
  };

  useEffect(() => {
    const updateData = async () => {
      let response, data;
      try {
        response = await fetch(
          `${process.env.REACT_APP_URL}/admin/getDaysOfyear`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${_token}`,
            },
          }
        );
        data = await response.json();
      } catch (error) {
        console.log(error);
      }

      if (!response.ok) {
        return new Error(`error ${response.status} occured...`);
      }
      setShowConfig(data.days);
    };

    updateData();
  }, [setShowConfig, _token, confirmBoxMsg, typeConfirmBox]);

  if (!token) {
    navigate("/admin/login");
  }

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
  }, [submitHandler]);

  return (
    <div className="">
      <div className=" flex flex-row-reverse   ">
        {confirmBoxMsg && (
          <div
            className={`w-[200px] fixed top-10 left-10  rounded-2xl text-white 
          ${typeConfirmBox ? "bg-green-600" : "bg-[#ed1c24]"}
          `}
          >
            <div
              style={{ direction: "rtl" }}
              className="text-right p-4 font-bold text-[14px] caret-transparent"
            >
              {confirmBoxMsg}
            </div>
            <span
              onClick={confirmHandler}
              className="absolute  ml-4 mb-1 bottom-1 font-bold cursor-pointer text-[16px]"
            >
              <img src={closeBtn} width={13} />
            </span>
          </div>
        )}
        <div className="w-[80%] mx-auto  ">
          <form
            onSubmit={(e) => {
              handleSubmit(submitHandler(e), handleError);
            }}
            className="  text-[15px]  font-bold 
              screen800:text-[13px]
              screen550:text-[11.5px]
            "
          >
            <div
              style={{ direction: "rtl" }}
              className="flex flex-row justify-start 
              


              "
            >
              <span className=" mt-1  "> تاریخ نوبت دهی : </span>
              <div
                className="flex flex-row-reverse mr-3
              screen700:mr-0
              
              
              "
              >
                <div className=" ">
                  <small className="text-[#ed1c24]">
                    {errors?.year && errors.year.message}
                  </small>
                  <select
                    name="year"
                    id="year"
                    className="w-[60px]  bg-white rounded-xl rounded-r-none  py-1 border-2 border-r-0  border-black text-[#ed1c24]  text-center
                    screen430:w-[50px]
                    "
                    onChange={() =>
                      changeHandler(setValue("year", inputValue[0].year))
                    }
                    {...register("year", registerOptions.year)}
                  >
                    <option value={moment().format("jYYYY")}>
                      {moment().format("jYYYY")}
                    </option>
                  </select>
                </div>

                <div className="">
                  <small className="text-[#ed1c24]">
                    {errors?.month && errors.month.message}
                  </small>
                  <select
                    name="month"
                    id="month"
                    className="w-20  bg-white  py-1  rounded-sm border-2 border-r-0 border-l-0  border-black text-[#ed1c24]  text-center
                    screen430:w-16
                    "
                    onChange={() =>
                      changeHandler(setValue("month", inputValue[0].month))
                    }
                    {...register("month", registerOptions.month)}
                  >
                    <option>ماه</option>

                    <option value="1">فروردین</option>
                    <option value="2">اردیبهشت</option>
                    <option value="3">خرداد</option>
                    <option value="4">تیر</option>
                    <option value="5">مرداد</option>
                    <option value="6">شهریور</option>
                    <option value="7">مهر</option>
                    <option value="8">آبان</option>
                    <option value="9">آذر</option>
                    <option value="10">دی</option>
                    <option value="11">بهمن</option>
                    <option value="12">اسفند</option>
                  </select>
                </div>
                <div className="">
                  <small className="text-[#ed1c24]">
                    {errors?.day && errors.day.message}
                  </small>
                  <select
                    name="day"
                    id="day"
                    className="w-16 bg-white rounded-xl rounded-l-none py-1 border-2  border-l-0  border-black text-[#ed1c24]  text-center 
                    screen430:w-12
                    
                    "
                    onChange={() =>
                      changeHandler(setValue("day", inputValue[0].day))
                    }
                    {...register("day", registerOptions.day)}
                  >
                    <option>روز</option>

                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className="flex flex-row-reverse  my-10
            
            "
            >
              <p className="mt-1">: ساعت شروع </p>

              <div
                className="flex flex-row mr-3
              screen700:mr-1
              
              "
              >
                <div className="">
                  <small className="text-[#ed1c24]">
                    {errors?.startHour && errors.startHour.message}
                  </small>
                  <select
                    name="startHour"
                    dir="rtl"
                    id="startHour"
                    className="w-18 bg-white py-1 border-r-0 border-black border-2 rounded-xl rounded-r-none text-[#ed1c24]  text-center
                    screen340:w-14
                     "
                    onChange={() =>
                      changeHandler(
                        setValue("startHour", inputValue[0].startHour)
                      )
                    }
                    {...register("startHour", registerOptions.startHour)}
                  >
                    <option>ساعت</option>
                    <optgroup label="صبح">
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </optgroup>
                    <optgroup label="عصر">
                      <option value="13">1</option>
                      <option value="14">2</option>
                      <option value="15">3</option>
                      <option value="16">4</option>
                      <option value="17">5</option>
                    </optgroup>
                  </select>
                </div>

                <div className="">
                  <small className="text-[#ed1c24]">
                    {errors?.startMinute && errors.startMinute.message}
                  </small>
                  <select
                    name="startMinute"
                    id="startMinute"
                    dir="rtl"
                    className="w-18 bg-white py-1 border-l-0 border-black border-2 rounded-xl rounded-l-none text-[#ed1c24]  text-center"
                    onChange={() =>
                      changeHandler(
                        setValue("startMinute", inputValue[0].startMinute)
                      )
                    }
                    {...register("startMinute", registerOptions.startMinute)}
                  >
                    <option>دقیقه </option>

                    <option value="00">00</option>
                    <option value="05">05</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-row-reverse  my-10">
              <p className=" mt-1">: ساعت پایان </p>

              <div
                className="flex flex-row mr-3
              screen700:mr-1
              "
              >
                <div className="">
                  <small className="text-[#ed1c24] ">
                    {errors?.endHour && errors.endHour.message}
                  </small>
                  <select
                    name="endHour"
                    id="endHour"
                    dir="rtl"
                    className="w-18 bg-white py-1 border-r-0 border-black border-2 rounded-xl rounded-r-none text-[#ed1c24]  text-center 
                    screen340:w-14
                    "
                    onChange={() =>
                      changeHandler(setValue("endHour", inputValue[0].endHour))
                    }
                    {...register("endHour", registerOptions.endHour)}
                  >
                    <option>ساعت</option>

                    <optgroup label="صبح">
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </optgroup>
                    <optgroup label="عصر">
                      <option value="13">1</option>
                      <option value="14">2</option>
                      <option value="15">3</option>
                      <option value="16">4</option>
                      <option value="17">5</option>
                      <option value="18">6</option>
                      <option value="19">7</option>
                      <option value="20">8</option>
                    </optgroup>
                  </select>
                </div>

                <div className="">
                  <small className="text-[#ed1c24]">
                    {errors?.endMinute && errors.endMinute.message}
                  </small>
                  <select
                    name="endMinute"
                    id="endMinute"
                    dir="rtl"
                    className="w-18 bg-white py-1 border-l-0 border-black border-2 rounded-xl rounded-l-none text-[#ed1c24]  text-center"
                    onChange={() =>
                      changeHandler(
                        setValue("endMinute", inputValue[0].endMinute)
                      )
                    }
                    {...register("endMinute", registerOptions.endMinute)}
                  >
                    <option>دقیقه</option>

                    <option value="00">00</option>
                    <option value="05">05</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              className="flex flex-row-reverse justify-between my-10  mx-auto
            "
            >
              <small className="text-[#ed1c24]">
                {errors?.persons && errors.persons.message}
              </small>
              <br />
              <div
                className=" flex flex-row
              "
              >
                <input
                  dir="rtl"
                  className="w-20 px-2 mx-2 bg-white   border-black border-2 rounded-xl  text-[#ed1c24]  text-center placeholder-red-300
                  screen800:w-16 
                  screen340:w-12
                  "
                  type="number"
                  name="persons"
                  placeholder="1"
                  min="1"
                  onChange={() =>
                    changeHandler(setValue("persons", inputValue[0].persons))
                  }
                  {...register("persons", registerOptions.persons)}
                />
                <span className="text-[12px]  ">: تعداد نفر در هر نوبت</span>
              </div>

              <small className="text-[#ed1c24]">
                {errors?.slotDuration && errors.slotDuration.message}
              </small>
              <br />

              <div
                className=" flex flex-row
                screen700:justify-end
              
              "
              >
                <input
                  className="w-20 px-2 mx-2 bg-white   border-black border-2 rounded-xl  text-[#ed1c24]  text-center placeholder-red-300
                  screen800:w-16 
                  "
                  type="number"
                  name="slotDuration"
                  placeholder="10"
                  dir="rtl"
                  min="5"
                  step={5}
                  onChange={() =>
                    changeHandler(
                      setValue("slotDuration", inputValue[0].slotDuration)
                    )
                  }
                  {...register("slotDuration", registerOptions.slotDuration)}
                />
                <span className=" text-[12px] ">: بازه ی زمانی</span>
              </div>
            </div>
            <div className="">
              <input
                type="submit"
                value="ثبت تنظیمات"
                className="  rounded-2xl px-3 text-sm bg-[#ed1c24] text-center py-1 cursor-pointer text-white  mt-10 caret-transparent
               disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-white
               screen700:px-2 screen550:text-[12px]
               "
                disabled={!isDirty || !isValid}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="w-full  screen700:pr-0  mx-auto mt-6">
        <div
          style={{ direction: "rtl" }}
          className=" text-[12px] grid grid-cols-4 p-3 gap-20 my-5 font-bold place-items-center rounded-3xl bg-red-600 text-white 
          "
        >
          <span className="">تاریخ</span>
          <span className="w-16">ساعت شروع</span>
          <span className="w-16">ساعت پایان</span>
          <span className="w-16">بازه ی زمانی</span>
        </div>
        {showConfig?.length === 0 && (
          <div
            style={{ direction: "rtl" }}
            className="text-center text-red-500 font-semibold py-3"
          >
            نوبت دهی پیدا نشد...
          </div>
        )}
        {showConfig?.map((element) => {
          return (
            <ConfigDetails
              key={element.id}
              date={element.dateString}
              start={element.startOfDay}
              end={element.endOfDay}
              slotDuration={element.slotDuration}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ConfigDaysOFYear;
