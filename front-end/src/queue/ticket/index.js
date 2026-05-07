import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { login } from "../../store/action";
import BTN from "../../assets/images/dokmeh-01.svg";

const Ticket = ({ ticket, mobile, shShenasname }) => {
  const [errSecurityMsg, setErrSecurityMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    securityCode: {
      required: "کد امنیتی ارسال  شده را وارد کنید",
      pattern: {
        value: /^\d+$/,
        message: "کد امنیتی نمیتواند شامل حروف باشد",
      },
    },
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (ticket === Number(getValues("securityCode"))) {
      dispatch(login(mobile));
      if (
        shShenasname === null ||
        shShenasname === undefined ||
        shShenasname === "" ||
        shShenasname === 0
      ) {
        return navigate(`/new-customer?mobile=${mobile}`);
      } else if (shShenasname !== null) {
        // return navigate("/request-type");
        return navigate("/calendar");
      }
    } else {
      handleError("ticket not matched...");
      setErrSecurityMsg("ticket not matched");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrSecurityMsg("");
    }, 3000);
  }, [errSecurityMsg]);

  return (
    <div className="caret-transparent">
      <form
        onSubmit={(e) => {
          handleSubmit(submitHandler(e), handleError);
        }}
        className=" mx-auto my-8 w-[520px] text-center p-7 text-[15px] grid grid-cols-1 gap-4  place-items-center 
        screen700:w-[400px]
        screen430:w-[340px]
        screen340:p-2
        
        "
      >
        <div
          style={{ direction: "rtl" }}
          className="grid grid-cols-3 text-[#0a1c54] 
      screen700:grid-cols-1
      screen700:w-[75%]
      screen430:w-ful
      "
        >
          <div
            className="col-start-1 col-end-2
        screen700:col-start-0 screen700:col-end-1  
        
        "
          >
            <img src={BTN} alt="logo12" />
          </div>

          <div
            className="col-start-2 col-end-4  w-[85%] mx-2
         screen700:col-start-0 screen700:col-end-1 screen700:mx-auto screen700:w-full
        "
          >
            <div className="text-justify  ">
              <span className="font-bold  text-[15.5px] ">
                {mobile} : شماره تلفن همراه شما
              </span>
              <br />
              <span className="text-[14px]">
                لطفا کد امنیتی که برای شما پیامک شده را در کادر زیر وارد کنید
                سپس دکمه ی تایید را بزنید:
              </span>
            </div>
            <small className="text-red-600">
              {errors?.securityCode && errors.securityCode.message}
              <br />
              {errSecurityMsg &&
                getValues("securityCode") !== String(ticket) &&
                "کد امنیتی اشتباه است"}
            </small>
            <input
              className="border-2 rounded-lg w-full px-2 py-2 caret-slate-500  border-[#0a1c54] text-left
                  screen550:p-1
                  "
              type="text"
              name="securityCode"
              placeholder="کد امنیتی"
              autoComplete="off"
              onChange={(e) => {
                setValue("securityCode", e.target.value);
              }}
              {...register("securityCode", registerOptions.securityCode)}
            />
            <br />
            <input
              type="submit"
              value=" تایید "
              className=" rounded-[15px] font-bold  text-sm px-3 py-1 mt-2  text-white float-left cursor-pointer
                 hover:cursor-pointer bg-[#0a1c54]
                 disabled:bg-gray-400 disabled:cursor-not-allowed 
                "
              disabled={!isDirty || !isValid}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Ticket;
