import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Spinner from "../../../shared/spinner";
import Pagination from "../../../shared/pagination";
import QueueDetails from "./queueDetails";

const QueueList = () => {
  const [token, setToken] = useState(
    useSelector((state) => state.adminReducer.token)
  );
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const [reservedData, setReservedData] = useState([]);
  // const [allReservedData, setAllReservedData] = useState([]);

  const updateList = async (id) => {
    setReservedData(
      reservedData.filter((queues) => {
        return queues.id !== id;
      })
    );
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/admin/getAllQueus`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(`error ${response.status} occured...`);
        }
        return response.json();
      })
      .then((res) => {
        setReservedData(res.data);
        // setAllReservedData(res.allQueues);
      })
      .catch((err) => console.log(err));
  }, [token, setReservedData]);

  if (reservedData === undefined) {
    return <Spinner />;
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = reservedData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div className="justify-center">
      {/* <div className="w-64 ml-[40%]  bg-rose-500 text-sm font-bold text-center rounded-md p-2 text-white  my-8">
        تمام نوبت های گرفته شده
      </div> */}
      <div>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-[#ed1c24] dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            name="search"
            className="w-52 p-2 text-sm text-[#ed1c24] bg-white rounded-2xl border-2 border-[#ed1c24] text-right
             focus:ring-red-500 focus:border-red-500 focus:placeholder-white screen600:w-40
              "
            placeholder="جستجو"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="">
        <div
          style={{ direction: "rtl" }}
          className=" text-[12px] grid grid-cols-8 p-3 gap-20  my-5 font-bold place-items-center rounded-3xl bg-red-600 text-white
          screen600:grid-cols-5
          screen340:grid-cols-4
          screen600:text-[11px]
          screen600:gap-10
          "
        >
          <span className="mr-10 screen600:hidden">نام</span>
          <span className="w-20 text-center screen600:hidden">
            نام خانوادگی
          </span>
          <span className="w-20 text-center screen600:mr-10 screen600:hidden">
            شماره موبایل
          </span>
          <span className="w-20 text-center screen600:mr-8">کد ملی</span>
          <span className="w-20 pr-3 screen600:mr-10 screen340:hidden">
            کارت ملی
          </span>
          <span className=" screen600:ml-4 screen400:ml-0">ساعت</span>
          <span className="ml-10 screen400:ml-6">تاریخ</span>
          <span className="ml-12">وضعیت</span>
        </div>

        {reservedData?.length === 0 && (
          <div
            style={{ direction: "rtl" }}
            className="text-center text-red-500 font-semibold py-3"
          >
            نوبتی پیدا نشد...
          </div>
        )}

        {/* {allReservedData &&
          allReservedData.map(queue => {
            return (
              <QueueDetails
                key={queue.id}
                search={search}
                firstName={queue.Customer.firstName}
                lastName={queue.Customer.lastName}
                nationalCode={queue.Customer.nationalCode}
                nationalCard={queue.Customer.nationalCard}
                mobile={queue.Customer.mobile}
                startTime={queue.TimeSlot.startTime}
              />
            )
          })} */}
      </div>

      {/* <div className="w-64 ml-[40%]  bg-rose-500 text-sm font-bold text-center rounded-md p-2 text-white  my-8">
        نوبت های گرفته شده برای امروز
      </div>
      <div>
        <div
          style={{ direction: "rtl" }}
          className=" container mx-auto w-3/4 grid grid-cols-6 p-3  my-5 font-bold text-gray-600 place-items-center rounded-md  border-t-2 border-b-2 border-rose-500"
        >
          <span>نام</span>
          <span>نام خانوادگی</span>
          <span>شماره موبایل</span>
          <span>کد ملی</span>
          <span>ساعت</span>
          <span>تاریخ</span>
        </div>
        {reservedData && reservedData.length === 0 && (
          <div className="text-center text-red-500 font-semibold py-3">
            queue is empty...
          </div>
        )}

      </div> */}
      {currentPosts?.map((queue) => {
        return (
          <QueueDetails
            key={queue.id}
            search={search}
            id={queue.id}
            firstName={queue.Customer.firstName}
            lastName={queue.Customer.lastName}
            nationalCode={queue.Customer.nationalCode}
            nationalCard={queue.Customer.nationalCard}
            mobile={queue.Customer.mobile}
            startTime={queue.TimeSlot.startTime}
            updateList={updateList}
          />
        );
      })}
      <br />

      {/* {console.log('ddd', reservedData.length)} */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={reservedData.length}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={currentPage}
      />

      {/* <button
        className="w-44 ml-[40%]  bg-rose-500 text-sm font-bold text-center rounded-md p-2 text-white  my-8"
        onClick={clickHandler}
      >
        خروج
      </button> */}
    </div>
  );
};

export default QueueList;
