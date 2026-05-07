import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// import { getMobiles } from "../../../shared/checkMobileRegEx";
import { loginAdmin } from "../../../store/adminAction";
import LoginAdmin from "../../admin/loginAdmin";
import Telmis from "../../../assets/images/logo telmis-01.svg";
import closeBtn from "../../../assets/images/close icone-01.svg";
import Background from "../../../assets/images/back1-01.svg";

const LogIn = () => {
  const [confirmBoxMsg, setConfirmBoxMsg] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState();
  const _token = useSelector((state) => state.adminReducer.token);
  const navigate = useNavigate();

  const _error = useSelector((state) => state.adminReducer.error);

  const dispatch = useDispatch();

  useEffect(() => {
    setError(_error);
  }, [_error]);

  useEffect(() => {
    setTimeout(() => {
      setConfirmBoxMsg("");
    }, 5000);
  }, [confirmBoxMsg]);

  useEffect(() => {
    setToken(_token);
  }, [token, _token]);

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
    userName: {
      required: "نام کاربری خود را وارد کنید",
    },
    password: {
      required: "کلمه عبور خود را وارد کنید",
      minLength: {
        value: 4,
        message: "کلمه ی عبور نمی تواند کمتر از 4 کاراکتر باشد",
      },
    },
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    dispatch(
      loginAdmin(
        getValues("userName").trim().toLowerCase(),
        getValues("password").trim().toLowerCase()
      )
    )
      .then((res) => {
        if (res.token) {
          return navigate("/admin");
        } else {
          if (res.type === "LOGIN_FAILED") {
            setConfirmBoxMsg(res.error);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const confirmHandler = () => {
    setConfirmBoxMsg("");
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        loginHandler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [loginHandler]);

  return (
    <div
      style={{
        fontFamily: "IranSansWeb",
        backgroundImage: `url(${Background})`,
        backgroundPosition: "left bottom",
        backgroundRepeat: "no-repeat",
      }}
      className="font-face mx-auto  pt-10 h-screen"
    >
      {confirmBoxMsg && (
        <div
          className={`w-[200px] fixed top-10 left-10 bg-[#ed1c24] rounded-2xl text-white 
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
      <div className=" w-[1000px] mx-auto caret-transparent  screen1000:w-[700px] screen700:w-[82%] screen470:w-[92%]">
        <div
          className="float-right clear-both my-4 mb-12 
        "
        >
          <img
            src={Telmis}
            width={200}
            height={99}
            className="screen600:w-[200px] screen600:h-[60px] caret-transparent "
            alt="لوگوی تلمیس"
          />
        </div>

        <div className="flex flex-row  justify-between  mt-12 clear-both px-8 w-full screen700:justify-center ">
          <form
            onSubmit={(e) => {
              handleSubmit(loginHandler(e), handleError);
            }}
            className="bg-gradient-to-t from-[#b01117] via-red-600 to-[#ec1b31] mt-8 rounded-xl bg-red-700 py-8  w-[350px]
            text-center  text-[15px]   place-items-center font-bold 
            screen700:w-[300px]             
            "
          >
            <small className="text-white">
              {errors?.userName && errors.userName.message}
            </small>
            <br />
            <input
              style={{ direction: "rtl" }}
              className=" rounded-2xl w-[80%] p-2 mb-4 caret-slate-500
              screen430:text-[10px]
              "
              type="text"
              name="userName"
              placeholder="نام کاربری "
              onChange={(e) => {
                setValue("userName", e.target.value);
              }}
              {...register("userName", registerOptions.userName)}
            />
            <br />

            <small className="text-white">
              {errors?.password && errors.password.message}
            </small>
            <input
              style={{ direction: "rtl" }}
              className="rounded-2xl w-[80%]  p-2 mb-4 caret-slate-500 
               screen430:text-[10px]  
              
              "
              type="password"
              name="password"
              placeholder="کلمه عبور"
              onChange={(e) => {
                setValue("password", e.target.value);
              }}
              {...register("password", registerOptions.password)}
            />

            {/* <div style={{ textAlign: "center", margin: "5px 0 0 0 " }}>
              <button
                className=" rounded-2xl px-6  text-center py-1 bg-[#ed1c24]  text-white hover:cursor-pointer
                screen430:px-4 screen430:text-[13px]
                "
                onClick={registerHandler}
              >
                ثبت نام
              </button>
              <br />
            </div> */}

            <div style={{ textAlign: "center", margin: "7px 0 " }}>
              <input
                type="submit"
                className={` rounded-xl px-10 text-center py-1 bg-green-400 mt-36  text-white hover:cursor-pointer
                disabled:bg-gray-300 disabled:text-white
                screen430:px-6 screen430:text-[13px]
                screen430:mb-28 
                `}
                disabled={!isDirty || !isValid}
                value="ورود"
              />

              <br />
            </div>
          </form>

          <div
            style={{ direction: "rtl" }}
            className=" pl-12 mt-8 text-justify font-extrabold w-[500px]
              text-gray-600 leading-tight text-lg
              screen700:hidden
              "
          >
            ادمین گرامی :
            <br />
            <span className="text-sm">
              در صورتیکه قبلا ثبت نام کرده اید نام کاربری و کلمه ی عبور خود را
              وارد کرده و با کلیلک بر روی دکمه ی ورود تنظیمات نوبت دهی صرافی را
              انجام دهید .
            </span>
            <br />
            <br />
            <span className="text-sm">
              در غیر اینصورت برای ثبت نام ابتدا نام کاربری و کلمه ی عبور مد نظر
              خود را وارد کنید و بر روی دکمه ی ثبت نام کلیک کنید .
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
