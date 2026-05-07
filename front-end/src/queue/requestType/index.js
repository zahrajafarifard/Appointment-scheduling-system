import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";

const initialState = [
  {
    request: "",
    requestType: "",
    demandType: "",
    quantity: "",
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

const RequestType = ({
  requestProp,
  requestTypeProp,
  quantityProp,
  DirtyValid,
}) => {
  const [inputValue, dispatch] = useReducer(reducer, initialState);

  const [demandTypes, setDemandTypes] = useState([]); //get from db
  const [requestTypes, setRequestTypes] = useState([]); //get from db
  // const [changedState, setChangedState] = useState();

  const {
    register,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "all",
  });

  const registerOptions = {
    request: {
      required: "فیلد  نمی تواند خالی باشد ",
    },
    requestType: {
      required: "فیلد نمی تواند خالی باشد ",
    },
    quantity: {
      required: "فیلد  نمی تواند خالی باشد ",
      max: {
        value: getValues("request") == 1 ? 2000 : 1000000000,
        message: "مقدار بالاتر از حد مجاز است",
      },
      pattern: {
        value: /^\d+$/,
        message: "مقدار وارد شده معتبر نمی باشد",
      },
    },
  };

  const changeHandler = (event) => {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    dispatch({ type: "Change", name, value });
  };

  useEffect(() => {
    //for demand input
    const fetchRequests = async () => {
      let response, data;

      try {
        response = await fetch(`${process.env.REACT_APP_URL}/request`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${_token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
      if (!response.ok) {
        return new Error(`error ${response.status} occured...`);
      }
      data = await response.json();
      setDemandTypes(data.data);
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    requestProp(getValues("request"));
    requestTypeProp(getValues("requestType"));
    quantityProp(getValues("quantity"));
    DirtyValid(isDirty, isValid);
    // }, [getValues("request"), getValues("requestType"), getValues("quantity")]);
  }, [
    getValues,
    DirtyValid,
    isDirty,
    isValid,
    quantityProp,
    requestTypeProp,
    requestProp,
  ]);

  // }, [requestTypes]);

  useEffect(() => {
    const demandHandler = async () => {
      let response;
      let data;
      try {
        response = await fetch(`${process.env.REACT_APP_URL}/requestType`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${_token}`,
          },
          body: JSON.stringify({
            demand: getValues("demandType"),
          }),
        });
        data = await response.json();
        if (!response.ok) {
          return new Error(`error ${response.status} occured...`);
        }
        setRequestTypes(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    demandHandler();
    // }, [setRequestTypes]);
  }, [requestTypes ,getValues]);

  return (
    <div
      style={{ direction: "rtl", fontFamily: "IranSansWeb" }}
      className=" my-2 text-[15px]  text-[#0a1c54] "
    >
      <div className=" my-2 screen430:text-[12px]">
        <p className="font-bold">
          لطفا اطلاعات مورد نیاز را در کادرهای مشخص پر نمایید
        </p>
      </div>

      <div className=" grid grid-cols-2 gap-y-1 my-5 screen900:grid-cols-1 screen700:text-[12px] ">
        <div className="grid grid-cols-2">
          <span className=" text-sm my-auto  text-center screen1000:text-[12px] ">
            درخواست
          </span>
          <select
            name="request"
            className="border-[#0a1c54]   border-2 rounded-[18px]  w-36 screen1000:w-32 px-2 py-0.5 
               screen340:text-[11px] screen1000:text-[11px]   screen430:w-28
              "
            onChange={() =>
              changeHandler(setValue("request", inputValue[0].request))
            }
            {...register("request", registerOptions.request)}
          >
            <option value={-1}>درخواست</option>
            <option value="1">خرید</option>
            <option value="0">فروش </option>
          </select>
          <br />
          <small className="text-red-600">
            {errors?.request && errors.request.message}
          </small>
        </div>

        <div className="grid grid-cols-2">
          <label className="text-sm my-auto text-center  screen1000:text-[12px] ">
            نوع تقاضا
          </label>
          <select
            name="demandType"
            className="border-[#0a1c54]  border-2 rounded-[18px]  w-36 screen1000:w-32 px-2 py-0.5  screen430:w-28
              screen340:text-[11px] screen1000:text-[11px]  
              "
            onChange={() => {
              changeHandler(setValue("demandType", inputValue[0].demandType));
            }}
            {...register("demandType", registerOptions.demandType)}
          >
            <option value={-2}>تقاضا</option>
            {demandTypes?.map((element) => {
              return (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              );
            })}
          </select>
          <br />
          <small className="text-red-600">
            {errors?.demandType && errors.demandType.message}
          </small>
        </div>

        <div className="grid grid-cols-2">
          <label className="text-sm my-auto text-center  screen1000:text-[12px] ">
            نوع درخواست
          </label>
          <select
            name="requestType"
            className="border-[#0a1c54] border-2 rounded-[18px]  w-36 screen1000:w-32 px-2 py-0.5   screen430:w-28 
              screen340:text-[11px] screen1000:text-[11px]  
              "
            onChange={() =>
              changeHandler(setValue("requestType", inputValue[0].requestType))
            }
            {...register("requestType", registerOptions.requestType)}
          >
            <option value={-3}> نوع در خواست </option>
            {requestTypes?.map((element) => {
              return (
                <option key={element.id} value={element.id}>
                  {element.name}
                </option>
              );
            })}
          </select>
          <br />
          <small className="text-red-600">
            {errors?.requestType && errors.requestType.message}
          </small>
        </div>

        <div className="grid grid-cols-2">
          <label className="text-sm my-auto text-center  screen1000:text-[12px] ">
            تعداد ارز / سکه
          </label>

          <input
            className="border-[#0a1c54] border-2 rounded-[18px] w-36 screen1000:w-32 px-2 py-0.5  screen430:w-28 
              screen340:text-[11px] screen1000:text-[11px]  
              "
            type="text"
            name="quantity"
            placeholder="مبلغ / تعداد"
            autoComplete="off"
            onChange={() =>
              changeHandler(setValue("quantity", inputValue[0].quantity))
            }
            {...register("quantity", registerOptions.quantity)}
          />
          <br />
          <small className="text-red-600">
            {errors?.quantity && errors.quantity.message}
          </small>
        </div>
      </div>
    </div>
  );
};

export default RequestType;
