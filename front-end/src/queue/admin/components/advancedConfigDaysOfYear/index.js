import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import moment from "moment-jalaali";

import closeBtn from "../../../../assets/images/close icone-01.svg";

const initialState = [
  {
    startHour: "",
    startMinute: "",

    endHour: "",
    endMinute: "",

    startYear: "",
    startMonth: "",
    startDay: "",

    endYear: "",
    endMonth: "",
    endDay: "",

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

const AdvancedConfigDaysOFYear = () => {
  const [inputValue, dispatch] = useReducer(reducer, initialState);

  const [token, setToken] = useState(
    useSelector((state) => state.adminReducer.token)
  );
  const [confirmBoxMsg, setConfirmBoxMsg] = useState("");
  const [typeConfirmBox, setTypeConfirmBox] = useState(false); //true --> green for status 200 , red --> false for status 422

  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const dispatchRedux = useDispatch();
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
    startYear: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    startMonth: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    startDay: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    endYear: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    endMonth: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    endDay: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    daysCheckBox: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setConfirmBoxMsg("");
    }, 4000);
  }, [confirmBoxMsg]);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [token, navigate]);

  const confirmHandler = () => {
    setConfirmBoxMsg(false);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    dispatch({ type: "Change", name, value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let response, data;
    try {
      response = await fetch(
        `${process.env.REACT_APP_URL}/admin/advanced-config-days-Of-year`,
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
            startDay: getValues("startDay"),
            startMonth: getValues("startMonth"),
            startYear: getValues("startYear"),
            endDay: getValues("endDay"),
            endMonth: getValues("endMonth"),
            endYear: getValues("endYear"),
            daysOfWeek: daysOfWeek,
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

  const checkHandler = async (event) => {
    let daysOfWeekArr = ["0", "0", "0", "0", "0", "0", "0"];
    //every day has a number -> mon=1 thur=2 .. sat=6 sun=0  and  daysOfWeekArr[0] is for sun , daysOfWeekArr[1]=mon,...
    let values = [];

    let inputs = document.getElementsByTagName("input");
    for (let i = inputs.length - 1; i >= 0; i--)
      if (inputs[i].type === "checkbox" && inputs[i].checked) {
        values.push(inputs[i].value);
        daysOfWeekArr[inputs[i].value] = "1";
      }
    setDaysOfWeek(daysOfWeekArr);
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
  }, [submitHandler]);

  return (
    <div className=" mx-auto w-full   justify-center">
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
            className="absolute  ml-4 bottom-1 font-bold cursor-pointer text-[16px]"
          >
            <img src={closeBtn} width={13} className="mb-1" alt="close" />
          </span>
        </div>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(submitHandler(e), handleError);
        }}
        className=" mb-12 text-[15px]  font-bold  
        screen700:text-[13px]
        screen340:text-[12px] 
        "
      >
        <div
          style={{ direction: "rtl" }}
          className="flex flex-row 
          screen600:flex-col
          "
        >
          <span className=" mt-1 caret-transparent">تاریخ شروع نوبت دهی :</span>

          <div
            className="flex flex-row-reverse mr-3
          screen600:justify-end
          screen600:mr-0 
          screen600:mt-5
          "
          >
            <div className="">
              <small className="text-[#ed1c24]">
                {errors?.startYear && errors.startYear.message}
              </small>
              <select
                name="startYear"
                id="year"
                className="w-[60px]  bg-white rounded-xl rounded-r-none  py-1 border-2 border-r-0  border-black text-[#ed1c24]  text-center
                screen340:w-[50px]
              "
                onChange={() =>
                  changeHandler(setValue("startYear", inputValue[0].startYear))
                }
                {...register("startYear", registerOptions.startYear)}
              >
                <option value={moment().format("jYYYY")}>
                  {moment().format("jYYYY")}
                </option>
              </select>
            </div>

            <div className="">
              <small className="text-[#ed1c24]">
                {errors?.startMonth && errors.startMonth.message}
              </small>
              <select
                name="startMonth"
                className="w-20  bg-white  py-1  rounded-sm border-2 border-r-0 border-l-0  border-black text-[#ed1c24]  text-center
                screen340:w-16
                "
                onChange={() =>
                  changeHandler(
                    setValue("startMonth", inputValue[0].startMonth)
                  )
                }
                {...register("startMonth", registerOptions.startMonth)}
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
                {errors?.startDay && errors.startDay.message}
              </small>
              <select
                name="startDay"
                id="day"
                className="w-16 bg-white rounded-xl rounded-l-none py-1 border-2  border-l-0  border-black text-[#ed1c24]  text-center
                screen340:w-12
                 "
                onChange={() =>
                  changeHandler(setValue("startDay", inputValue[0].startDay))
                }
                {...register("startDay", registerOptions.startDay)}
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
          style={{ direction: "rtl" }}
          className="flex flex-row   my-10 
          screen600:flex-col
          "
        >
          <p className=" mt-1 caret-transparent"> تاریخ پایان نوبت دهی : </p>
          <small className="text-[#ed1c24]">
            {errors?.endYear && errors.endYear.message}
          </small>
          <div
            className="flex flex-row-reverse mr-3
          screen600:justify-end
          screen600:mr-0 
          screen600:mt-5"
          >
            <div className="">
              <select
                name="endYear"
                id="endYear"
                className="w-[60px]  bg-white rounded-xl rounded-r-none  py-1 border-2 border-r-0  border-black text-[#ed1c24]  text-center
                screen340:w-[50px]
                "
                // value={inputValue[0].endYear}
                // onChange={changeHandler}
                onChange={() =>
                  changeHandler(setValue("endYear", inputValue[0].endYear))
                }
                {...register("endYear", registerOptions.endYear)}
              >
                <option value={moment().format("jYYYY")}>
                  {moment().format("jYYYY")}
                </option>
              </select>
            </div>

            <div className="">
              <small className="text-[#ed1c24]">
                {errors?.endMonth && errors.endMonth.message}
              </small>
              <select
                name="endMonth"
                id="endMonth"
                className="w-20  bg-white  py-1  rounded-sm border-2 border-r-0 border-l-0  border-black text-[#ed1c24]  text-center
                screen340:w-16 
                "
                // value={inputValue[0].endMonth}
                // onChange={changeHandler}
                onChange={() =>
                  changeHandler(setValue("endMonth", inputValue[0].endMonth))
                }
                {...register("endMonth", registerOptions.endMonth)}
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
                {errors?.endDay && errors.endDay.message}
              </small>
              <select
                name="endDay"
                id="endDay"
                // value={inputValue[0].endDay}
                // onChange={changeHandler}
                className="w-16 bg-white rounded-xl rounded-l-none py-1 border-2  border-l-0  border-black text-[#ed1c24]  text-center
                screen340:w-12 
                "
                onChange={() =>
                  changeHandler(setValue("endDay", inputValue[0].endDay))
                }
                {...register("endDay", registerOptions.endDay)}
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
          className="flex flex-row-reverse  
          screen600:flex-col
          "
        >
          <div className="flex flex-row-reverse  ml-2  ">
            <span className=" mt-1 caret-transparent">: ساعت شروع </span>

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
                  id="startHour"
                  dir="rtl"
                  className="w-16 bg-white  py-1 border-r-0 border-black border-2 rounded-xl rounded-r-none text-[#ed1c24]  text-center
                  screen700:w-14 
                  screen340:w-12
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
                  className="w-18 bg-white py-1 border-l-0 border-black border-2 rounded-xl rounded-l-none text-[#ed1c24]  text-center
                  screen700:w-14 
                  "
                  onChange={() =>
                    changeHandler(
                      setValue("startMinute", inputValue[0].startMinute)
                    )
                  }
                  {...register("startMinute", registerOptions.startMinute)}
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

          <div className="flex flex-row-reverse  ">
            <span
              className=" mt-1 caret-transparent 
          screen600:mt-6
          "
            >
              : ساعت پایان{" "}
            </span>

            <div
              className="flex flex-row mr-3
              screen700:mr-1
          screen600:mt-5

            "
            >
              <div className="">
                <small className="text-[#ed1c24]">
                  {errors?.endHour && errors.endHour.message}
                </small>
                <select
                  name="endHour"
                  id="endHour"
                  dir="rtl"
                  className="w-18 bg-white py-1 border-r-0 border-black border-2 rounded-xl rounded-r-none text-[#ed1c24]  text-center
                  screen340:w-12
                  screen700:w-14 
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
                  className="w-18 bg-white py-1 border-l-0 border-black border-2 rounded-xl rounded-l-none text-[#ed1c24]  text-center
                  screen700:w-14 
                  "
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
        </div>

        <div
          className="flex flex-row-reverse my-10
          screen600:flex-col-reverse
          "
        >
          <small className="text-[#ed1c24]">
            {errors?.persons && errors.persons.message}
          </small>
          <div className=" flex flex-row screen600:justify-end screen600:mt-5 ">
            <input
              dir="rtl"
              className="w-20 px-2 mx-2 bg-white   border-black border-2 rounded-xl  text-[#ed1c24]  text-center placeholder-red-300
              screen800:w-16 
              screen340:w-14 
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
            <span className="   caret-transparent ">
              : تعداد نفر در هر نوبت
            </span>
          </div>

          <small className="text-[#ed1c24]">
            {errors?.slotDuration && errors.slotDuration.message}
          </small>
          <div className=" flex flex-row screen600:justify-end ">
            <input
              className="w-20 px-2 mx-2 bg-white placeholder-red-300 border-black border-2 rounded-xl  text-[#ed1c24]  text-center
              screen340:w-14 
              screen800:w-16 
              "
              dir="rtl"
              type="number"
              name="slotDuration"
              placeholder="10"
              min="5"
              step={5}
              onChange={() =>
                changeHandler(
                  setValue("slotDuration", inputValue[0].slotDuration)
                )
              }
              {...register("slotDuration", registerOptions.slotDuration)}
            />
            <span className="  caret-transparent">: بازه ی زمانی</span>
          </div>
        </div>
        <p
          style={{ direction: "rtl" }}
          className="my-10 caret-transparent screen600:text-center"
        >
          تکرار تنظیمات برای روزهای :
        </p>

        <div
          className="grid grid-cols-4 gap-4  place-items-start w-full 
          screen600:grid-cols-3
          screen400:grid-cols-2
          screen600:gap-3
           "
          style={{ direction: "rtl" }}
        >
          <div>
            <label className="mx-2 caret-transparent" htmlFor="myCheck">
              شنبه
            </label>
            <input
              type="checkbox"
              className="accent-[#ed1c24]"
              name="daysCheckBox"
              id="sat"
              value="6"
              onClick={checkHandler}
              {...register("daysCheckBox", registerOptions.daysCheckBox)}
            />
          </div>

          <div>
            <label className="mx-2 caret-transparent" htmlFor="myCheck">
              یکشنبه
            </label>
            <input
              type="checkbox"
              className="accent-[#ed1c24]"
              name="daysCheckBox"
              id="sun"
              value="0"
              onClick={checkHandler}
              {...register("daysCheckBox", registerOptions.daysCheckBox)}
            />
          </div>
          <div>
            <label className="mx-2 caret-transparent" htmlFor="myCheck">
              دوشنبه
            </label>
            <input
              type="checkbox"
              className="accent-[#ed1c24]"
              name="daysCheckBox"
              id="mon"
              value="1"
              onClick={checkHandler}
              {...register("daysCheckBox", registerOptions.daysCheckBox)}
            />
          </div>

          <div>
            <label className="mx-2 caret-transparent" htmlFor="myCheck">
              سه شنبه
            </label>
            <input
              type="checkbox"
              className="accent-[#ed1c24]"
              name="daysCheckBox"
              id="thus"
              value="2"
              onClick={checkHandler}
              {...register("daysCheckBox", registerOptions.daysCheckBox)}
            />
          </div>

          <div>
            <label className="mx-2 caret-transparent" htmlFor="myCheck">
              چهارشنبه
            </label>
            <input
              type="checkbox"
              name="daysCheckBox"
              className="accent-[#ed1c24]"
              id="wends"
              value="3"
              onClick={checkHandler}
              {...register("daysCheckBox", registerOptions.daysCheckBox)}
            />
          </div>
          <div>
            <label className="mx-2 caret-transparent" htmlFor="myCheck">
              پنج شنبه
            </label>
            <input
              type="checkbox"
              className="accent-[#ed1c24]"
              name="daysCheckBox"
              id="thurs"
              value="4"
              onClick={checkHandler}
              {...register("daysCheckBox", registerOptions.daysCheckBox)}
            />
          </div>
          <div>
            <label className="mx-2 caret-transparent" htmlFor="myCheck">
              جمعه
            </label>
            <input
              type="checkbox"
              className="accent-[#ed1c24]"
              name="daysCheckBox"
              id="thurs"
              value="5"
              onClick={checkHandler}
              {...register("daysCheckBox", registerOptions.daysCheckBox)}
            />
          </div>
        </div>

        <div className="screen600:text-center">
          <input
            type="submit"
            value="ثبت تنظیمات"
            className="  rounded-2xl px-3 text-sm bg-[#ed1c24] text-center py-1 cursor-pointer text-white  mt-10
              screen600:px-2 screen550:text-[12px]
              disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-white "
            disabled={!isDirty || !isValid}
          />
        </div>
      </form>
    </div>
  );
};

export default AdvancedConfigDaysOFYear;
