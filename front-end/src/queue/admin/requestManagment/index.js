import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import RequsetDetails from "./requestDetails";

const Request = () => {
  const [requestName, setRequestName] = useState(""); // for input
  const [requestType, setRequestType] = useState(""); // for input

  const [requestTypes, setRequestTypes] = useState([]); // for table
  const [requestNames, setRequestNames] = useState([]); // for select input

  const [editMode, setEditMode] = useState(false); // for table
  const [idState, setIdState] = useState(false); // for table

  const [token, setToken] = useState(
    useSelector((state) => state.adminReducer.token)
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      requestName: requestName,
    },
  });
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    requestName: {
      required: "فیلد نام درخواست نمی تواند خالی باشد ",
      // pattern: {
      //   value: /^[\u0600-\u06FF\s]+$/,
      //   message: 'لطفا نام درخواست را فارسی وارد کنید'
      // }
    },
    requestType: {
      required: "فیلد نوع درخواست نمی تواند خالی باشد ",
      pattern: {
        value: /^[\u0600-\u06FF\s]+$/,
        message: "لطفا نوع درخواست را فارسی وارد کنید",
      },
    },
  };

  const insertHandler = async (e) => {
    e.preventDefault();
    let response, data;

    if (editMode) {
      try {
        response = await fetch(
          `${process.env.REACT_APP_URL}/requestType/${idState}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              updatedName: getValues("requestType"),
            }),
          }
        );

        data = await response.json();
      } catch (error) {
        console.log(error);
      }

      if (!response.ok) {
        return new Error(`error ${response.status} occured...`);
      }
      setRequestTypes(data.data);
      setValue("requestName", " ", { shouldTouch: true });
      setValue("requestType", " ", { shouldTouch: true });
      setEditMode(false);
    } else {
      try {
        response = await fetch(
          `${process.env.REACT_APP_URL}/requestType/insert`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              requestNameId: getValues("requestName"),
              type: getValues("requestType"),
            }),
          }
        );
        data = await response.json();
      } catch (error) {
        console.log(error);
      }

      if (!response.ok) {
        return new Error(`error ${response.status} occured...`);
      }
      setRequestTypes(data.data);
      setValue("requestName", " ", { shouldTouch: true });
      setValue("requestType", " ", { shouldTouch: true });

      // await setRequestName(' ')
    }
  };

  const updateList = async (id) => {
    setRequestTypes(
      requestTypes.filter((element) => {
        return element.id !== id;
      })
    );
  };

  const editRequest = async (id) => {
    setEditMode(true);
    let response, data;
    try {
      response = await fetch(`${process.env.REACT_APP_URL}/requestType/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      data = await response.json();
    } catch (error) {
      console.log(error);
    }

    if (!response.ok) {
      return new Error(`error ${response.status} occured...`);
    }
    setIdState(data.data.id);
    setValue("requestType", data.data.name, { shouldTouch: true });
  };

  useEffect(() => {
    const fetchRequests = async () => {
      let response, data;
      try {
        response = await fetch(`${process.env.REACT_APP_URL}/requestType`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        data = await response.json();
      } catch (error) {
        console.log(error);
      }
      if (!response.ok) {
        return new Error(`error ${response.status} occured...`);
      }
      setRequestTypes(data.data);
    };
    fetchRequests();
  }, [setRequestTypes, token]);

  useEffect(() => {
    const fetchRequests = async () => {
      let response, data;
      try {
        response = await fetch(`${process.env.REACT_APP_URL}/request`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        data = await response.json();
      } catch (error) {
        console.log(error);
      }
      if (!response.ok) {
        return new Error(`error ${response.status} occured...`);
      }
      setRequestNames(data.data);
    };
    fetchRequests();
  }, [setRequestNames, token]);


  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter") {
        event.preventDefault();
        insertHandler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [insertHandler]);


  return (
    <div className="">
      <div className="flex flex-row-reverse justify-start ">
        <label style={{ direction: "rtl" }} className="mx-8 mt-1">
          نام عرضه :
        </label>
        <select
          name="requestName"
          id="year"
          dir="rtl"
          className="border-[#0a1c54] border-2 text-right rounded-[18px] w-52 px-4 scPreen700:py-1 screen430:w-44"
          onChange={() => setRequestName(setValue("requestName", requestName))}
          {...register("requestName", registerOptions.requestName)}
        >
          <option>نام عرضه</option>
          {requestNames?.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
      </div>
      <small className="text-red-600">
        {errors?.requestName && errors.requestName.message}
      </small>

      <div className="flex flex-row-reverse justify-start mt-10 ">
        <label style={{ direction: "rtl" }} className="mx-8 mt-1">
          نوع عرضه :
        </label>

        <input
          className="border-[#0a1c54] border-2 text-right rounded-[18px] w-52 px-4 scPreen700:py-1 screen430:w-44"
          type="text"
          name="requestType"
          placeholder="نوع"
          onChange={() => setRequestName(setValue("requestType", requestType))}
          {...register("requestType", registerOptions.requestType)}
        />
        <small className="text-red-600  my-auto  mr-2">
          {errors?.requestType && errors.requestType.message}
        </small>
      </div>

      <div className=" mt-16 justify-center  w-fit mx-auto ">
        <button
          className=" rounded-2xl w-16  py-1   bg-[#0a1c54] text-white font-bold text-center 
                cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white
                "
          disabled={!isDirty || !isValid}
          onClick={insertHandler}
        >
          {editMode ? "ویرایش" : "اضافه"}
        </button>
      </div>

      <div className="mt-16">
        <div
          style={{ direction: "rtl" }}
          className={`text-[12px]  border-2 p-1 my-5   border-[#ed1c24] rounded-3xl font-bold 
        place-items-center grid grid-cols-3
        `}
        >
          <span className="ml-10">نام عرضه</span>
          <span className="ml-10">نوع عرضه</span>
          <span className="">عملیات</span>
        </div>

        {requestTypes?.length === 0 && (
          <div
            style={{ direction: "rtl" }}
            className="text-center text-red-500 font-semibold py-3"
          >
            لیست عرضه خالی می باشد...
          </div>
        )}

        {requestTypes?.map((request) => {
          return (
            <RequsetDetails
              key={request.id}
              id={request.id}
              type={request.name}
              name={request.Request?.name}
              updateList={updateList}
              editRequest={editRequest}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Request;
