import React, { useEffect, useReducer, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-jalaali";
import DatePicker from "react-datepicker2";
import { useForm } from "react-hook-form";

import { Logout } from "../../store/action";

const initialState = [
  {
    firstName: "",
    lastName: "",
    mobile: "",
    // birthDate: '',
    shShenasname: "",
    nationalCard: "",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "Change":
      return state.map((data) => {
        console.log(action);
        return { ...data, [action.name]: action.value };
      });
    case "SetMobile":
      return state.map((data) => {
        return { ...data, mobile: action._mobile };
      });
    // case 'SetBirthDate':
    //   return state.map(data => {
    //     return { ...data, nationalCard: action.nationalCard }
    //   })
    default:
      return state;
  }
};

const Customer = () => {
  const [inputValue, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobile, setMobile] = useState();
  const [dateField, setDateField] = useState(moment());

  // const [nationalCard, setNationalCard] = useState();

  const _token = useSelector((state) => state.reducer.token);
  const navigate = useNavigate();
  const dispatchRedux = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      mobile: mobile,
    },
  });
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    mobile: {
      required: "فیلد موبایل نمی تواند خالی باشد ",
    },
    firstName: {
      required: "فیلد نام نمی تواند خالی باشد ",
      pattern: {
        value: /^[\u0600-\u06FF\s]+$/,
        message: "لطفا نام خود را فارسی وارد کنید",
      },
    },
    lastName: {
      required: "فیلد نام خانوادگی نمی تواند خالی باشد ",
      pattern: {
        value: /^[\u0600-\u06FF\s]+$/,
        message: "لطفا نام خود را فارسی وارد کنید",
      },
    },
    birthDate: {
      required: "فیلد تاریخ تولد نمی تواند خالی باشد ",
      // pattern: {
      //   value: /^\d{4}\/\d{2}\/\d{2}$/,
      //   message: 'لطفا با فرمت 1368/01/02 تاریخ تولد خود را وراد کنید'
      // }
    },
    shShenasname: {
      required: "فیلد شماره شناسنامه نمی تواند خالی باشد ",
      pattern: {
        value: /^\d+$/,
        message: "شماره شناسنامه وارد شده معتبر نمی باشد",
      },
    },
    nationalCard: {
      required: "فایل باید از نوع jpg ، jpeg یا png باشد",
    },
  };

  useEffect(() => {
    const _mobile = searchParams.get("mobile");
    setMobile(_mobile);
    dispatch({ type: "SetMobile", _mobile });
  }, [setMobile, searchParams, dispatch]);

  const submitHandler = async (event) => {
    event.preventDefault();
    let response, data;
    // console.log("mooobile", getValues("nationalCard")[0]);
    const _body = new FormData();
    _body.append("firstName", getValues("firstName"));
    _body.append("lastName", getValues("lastName"));
    _body.append("birthDate", dateField);
    _body.append("shShenasname", getValues("shShenasname"));
    _body.append("nationalCard", getValues("nationalCard")[0]);
    _body.append("mobile", mobile);
    // console.log("_bodddy", _body);
    try {
      response = await fetch(
        `${process.env.REACT_APP_URL}/customer/new-customer`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${_token}`,
          },
          body: _body,
        }
      );

      data = await response.json();
    } catch (error) {
      console.log(error);
    }
    console.log(response);

    if (!response.ok) {
      return new Error(`error ${response.status} occured...`);
    }
    if (response.ok) {
      console.log(data.customer);
      return navigate("/calendar");
    }
  };

  const changeHandler = (event) => {
    event.preventDefault();
    // console.log(event.target.name)
    let value = event.target.value;
    let name = event.target.name;
    dispatch({ type: "Change", name, value });
  };

  const logOutHandler = (e) => {
    e.preventDefault();
    dispatchRedux(Logout());
    navigate("/");
  };

  const fileHandler = (e) => {
    let file = e.target.files[0];
    let name = e.target.name;

    let fileReader = new FileReader();
    fileReader.onload = () => {
      dispatch({ type: "Change", name, file });
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <form
      style={{ direction: "rtl", fontFamily: "IranSansWeb" }}
      onSubmit={(e) => {
        handleSubmit(submitHandler(e), handleError);
      }}
      className=" container mx-auto my-8 text-[15px] grid grid-cols-1 text-[#0a1c54] px-36
      screen700:px-5
      "
    >
      <div className="text-left mb-10 ">
        <button
          className=" rounded-2xl w-16  pb-1   bg-[#0a1c54] text-white font-bold
              cursor-pointer   "
          onClick={logOutHandler}
        >
          خروج
        </button>
      </div>

      <div className=" screen700 screen700:text-center ">
        <div className="text-justify my-6  screen430:my-2 screen430:text-[12px]">
          <p className="screen700:text-center ">
            به صفحه <span className="font-bold">نوبت دهی </span>صرافی اریکه خوش
            آمدید
          </p>
          <p className="screen700:text-center">
            لطفا اطلاعات مورد نیاز را در کادرهای مشخص پر نمایید
          </p>
        </div>

        <div className="grid grid-cols-3 gap-y-5  screen800:grid-cols-2 screen950:gap-x-4 screen700:flex screen700:flex-col screen700:gap-0 screen430:pt-3  ">
          <div className="h-14 ">
            <input
              className="border-[#0a1c54] border-2 rounded-[18px] w-52 px-4 screen1000:w-44 screen700:py-1 screen430:w-44"
              type="text"
              name="firstName"
              autoComplete="off"
              placeholder="نام"
              onChange={() =>
                changeHandler(setValue("firstName", inputValue[0].firstName))
              }
              {...register("firstName", registerOptions.firstName)}
            />
            <br />
            <small className="text-red-600">
              {errors?.firstName && errors.firstName.message}
            </small>
          </div>

          <div className="h-14">
            <input
              className="border-[#0a1c54] border-2 rounded-[18px] w-52 px-4 screen1000:w-44 screen700:py-1 screen430:w-44 "
              type="text"
              name="lastName"
              placeholder="نام خانوادگی"
              autoComplete="off"
              onChange={() =>
                changeHandler(setValue("lastName", inputValue[0].lastName))
              }
              {...register("lastName", registerOptions.lastName)}
            />
            <br />
            <small className="text-red-600">
              {errors?.lastName && errors.lastName.message}
            </small>
          </div>

          <div className="h-14">
            <input
              readOnly
              className="border-[#0a1c54] border-2 rounded-[18px] w-52 px-4 screen1000:w-44 screen700:py-1 screen430:w-44"
              type="text"
              name="mobile"
              placeholder="شماره موبایل"
              defaultValue={inputValue[0].mobile}
            />
            <br />
            <small className="text-red-600">
              {errors?.mobile && errors.mobile.message}
            </small>
          </div>

          <div className="h-14">
            <DatePicker
              className="border-[#0a1c54] border-2 rounded-[18px] w-52 px-4 screen1000:w-44 screen700:py-1 screen430:w-44  "
              persianDigits={true}
              name="birthDate"
              // onChange={() =>
              //   changeHandler(setValue('birthDate', inputValue[0].birthDate))
              // }
              // {...register('birthDate', registerOptions.birthDate)}
              value={dateField}
              onChange={(value) => setDateField(value)}
              isGregorian={false}
              timePicker={false}
            />

            <br />
            <small className="text-red-600">
              {errors?.birthDate && errors.birthDate.message}
            </small>
          </div>

          <div className="h-14">
            <input
              className="border-[#0a1c54] border-2 rounded-[18px] w-52 px-4 screen1000:w-44 screen700:py-1 screen430:w-44"
              type="text"
              name="shShenasname"
              placeholder="شماره شناسنامه"
              autoComplete="off"
              onChange={() =>
                changeHandler(
                  setValue("shShenasname", inputValue[0].shShenasname)
                )
              }
              {...register("shShenasname", registerOptions.shShenasname)}
            />
            <br />
            <small className="text-red-600">
              {errors?.shShenasname && errors.shShenasname.message}
            </small>
          </div>

          <div className="h-14 ">
            <input
              id="nationalCard"
              name="nationalCard"
              className="w-32"
              type="file"
              accept=".jpg , .jpeg , .png"
              // value={this.state.image}
              // onChange={fileHandler}
              onChange={() =>
                fileHandler(
                  setValue("nationalCard", inputValue[0].nationalCard)
                )
              }
              {...register("nationalCard", registerOptions.nationalCard)}
              // {...register("nationalCard", {
              //   validate: {
              //     lessThan10MB: (files) =>
              //       files[0]?.size < 1000000 || "حجم فایل کمتر از 100KB باشد",
              //     acceptedFormats: (files) =>
              //       ["image/jpeg", "image/png", "image/jpg"].includes(
              //         files[0]?.type
              //       ) || "فایل باید از نوع jpg ، jpeg یا png باشد",
              //   },
              // })}
            />
            <p
              style={{ direction: "rtl", fontFamily: "IranSansWeb" }}
              className="IRANSansWeb mt-1 text-xs text-gray-500 dark:text-gray-300 screen950:text-[10px]"
              id="file_input_help"
            >
              تصویر کارت ملی را آپلود کنید
            </p>
            <small className="text-red-600">
              {errors?.nationalCard && errors.nationalCard.message}
            </small>
          </div>
        </div>
      </div>
      <div className="text-left mt-12 screen700:text-center screen700:mt-10">
        <input
          type="submit"
          value="تایید"
          className=" rounded-2xl w-16 text-center py-1 bg-[#0a1c54] text-white font-bold
          disabled:bg-gray-400 disabled:cursor-not-allowed
          cursor-pointer    "
          disabled={!isDirty || !isValid}
        />
      </div>
    </form>
  );
};

export default Customer;
