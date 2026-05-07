import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { getMobiles } from "../../shared/checkMobileRegEx";
import { checkNationalCode } from "../../shared/checkNationalCode";
import Ticket from "../ticket";
import BTN from "../../assets/images/dokmeh-01.svg";

const Mobile = () => {
  const [shShenasname, setShShenasname] = useState(0);
  const [ticket, setTicket] = useState(0);

  const [errorBoxMsg, setErrorBoxMsg] = useState();

  useEffect(() => {
    setTimeout(() => {
      setErrorBoxMsg(" ");
    }, 4500);
  }, [errorBoxMsg]);

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
    mobile: {
      required: "شماره موبایل خود را وارد کنید",

      pattern: {
        value: /^09[0|1|2|3][0-9]{8}$/,
        message: "شماره موبایل وارد شده معتبر نمی باشد",
      },
      minLength: {
        value: 11,
        message: "شماره موبایل وارد شده معتبر نمی باشد",
      },
      maxLength: {
        value: 11,
        message: "شماره موبایل وارد شده معتبر نمی باشد",
      },
    },
    nationalCode: {
      required: " کد ملی خود را وارد کنید",
      pattern: {
        value: /^(?!(\d)\1{9})\d{10}$/,
        message: "کد ملی  وارد شده معتبر نمی باشد",
      },
    },
  };

  const submitMobileHandler = async (event) => {
    event.preventDefault();

    const validPhoneNumber = getMobiles(getValues("mobile"));
    const validNationalCode = checkNationalCode(getValues("nationalCode"));
    if (!validNationalCode) {
      setErrorBoxMsg("کد ملی وارد شده معتبر نیست");
    }

    let response, data;

    if (
      validPhoneNumber[0] &&
      validPhoneNumber.length > 0 &&
      validNationalCode
    ) {
      try {
        response = await fetch(
          `${process.env.REACT_APP_URL}/customer/new-customer-mobile`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mobile: getValues("mobile"),
              nationalCode: getValues("nationalCode"),
            }),
          }
        );
        data = await response.json();
      } catch (error) {
        console.log(error);
      }

      if (response.status === 422) {
        setErrorBoxMsg("عدم تطابق شماره موبایل و کد ملی");
      }
      if (response.status === 403) {
        setErrorBoxMsg("عدم تطابق شماره موبایل و کد ملی");
      }

      if (!response.ok) {
        return new Error(`error ${response.status} occured...`);
      }

      console.log("mob", data.customer);
      setTicket(data.customer.ticket);
      setShShenasname(data.customer.shShenasname);
    }
  };

  if (ticket) {
    return (
      <Ticket
        ticket={ticket}
        mobile={getValues("mobile")}
        shShenasname={shShenasname}
      />
    );
  }

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          handleSubmit(submitMobileHandler(e), handleError);
        }}
        className=" mx-auto my-8 w-[620px]  text-[15px] grid grid-cols-1 gap-4   font-bold 
        screen700:w-[300px]
         screen430:w-[240px] "
      >
        <div
          style={{ direction: "rtl" }}
          className="grid grid-cols-3
         screen700:grid-cols-1"
        >
          <div
            className="col-start-1 col-end-2 
            screen700:col-start-0 screen700:col-end-1  screen700:mx-auto  screen700:w-64"
          >
            <img src={BTN} width={140} alt="logo12" />
          </div>

          <div
            className="text-[#0a1c54] col-start-2 col-end-4 w-[80%] mr-2
          screen700:col-start-0 screen700:col-end-1 screen700:mx-auto screen700:w-full   "
          >
            <div
              className="text-[17px] tracking-wide text-justify 
            screen700:text-[15px]  "
            >
              <span className="">
                لطفا شماره تلفن همراه خود را واردنمایید ، سپس بر روی دکمه ی
                دریافت پیامک کلیک نمایید
              </span>
              <br />

              <small className="text-red-600 ">
                {errorBoxMsg && errorBoxMsg}
              </small>
              <small className="text-red-600 ">
                {errors?.mobile && errors.mobile.message}
              </small>

              <br />
              <div className="text-left ">
                <input
                  className="border-2 rounded-xl w-full p-2 text-left border-[#0a1c54] 
                  screen550:p-1       "
                  type="text"
                  name="mobile"
                  placeholder="09xxxxxxxxx"
                  autoComplete="off"
                  onChange={(e) => {
                    setValue("mobile", e.target.value);
                  }}
                  {...register("mobile", registerOptions.mobile)}
                />
              </div>

              <small className="text-red-600 ">
                {errors?.nationalCode && errors.nationalCode.message}
              </small>
              <br />
              <div className="text-left">
                <input
                  className="border-2 rounded-xl w-full p-2 text-right border-[#0a1c54] 
                  screen550:p-1"
                  type="text"
                  name="nationalCode"
                  placeholder="کد ملی"
                  autoComplete="off"
                  onChange={(e) => {
                    setValue("nationalCode", e.target.value);
                  }}
                  {...register("nationalCode", registerOptions.nationalCode)}
                />
              </div>
            </div>

            <div className="text-left screen700:text-center ">
              <input
                type="submit"
                value="ارسال پیامک"
                className=" rounded-[16px] mt-4 py-1 px-3 text-white hover:cursor-pointer bg-[#0a1c54] disabled:bg-gray-400 disabled:cursor-not-allowed
                screen550:px-2
                screen550:text-[13px]
                "
                disabled={!isDirty || !isValid}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Mobile;
