import React from "react";
import { Fragment } from "react";

const Modal = ({ body, closeHandler, confirmHandler, rejectHandler }) => {
  return (
    <Fragment>
      <div
        className="w-full h-full bg-gray-800  opacity-60 fixed top-0 left-0 z-10"
        onClick={closeHandler}
      />

      <div className="z-20 relative  text-sm text-[#0a1c54]  bg-white  h-full  overflow-hidden rounded-2xl screen500:w-48  ">
        <div className=" mx-4 mb-3 mt-6 ">
          <div className="">آیا مایل به دریافت نوبت دیگری هستید؟</div>
          <div className="flex flex-row-reverse justify-center">
            <button
              onClick={confirmHandler}
              className="text-white  bg-[#0a1c54] rounded-lg  px-4 mx-2 mb-2 mt-6"
            >
              بله
            </button>
            <button
              onClick={rejectHandler}
              className="border border-[#0a1c54] rounded-lg  px-4 mx-2 mb-2 mt-6"
            >
              خیر
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
