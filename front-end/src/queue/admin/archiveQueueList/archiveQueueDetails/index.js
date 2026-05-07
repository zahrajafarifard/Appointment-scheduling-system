import React from "react";
import { useSelector } from "react-redux";

import moment from "moment-jalaali";

const ArchiveQueueDetails = ({
  id,
  firstName,
  lastName,
  mobile,
  nationalCode,
  nationalCard,
  startTime,
  search,
  updateList,
}) => {
  const _startTime = new Date(startTime);

  const _token = useSelector((state) => state.adminReducer.token);

  const saveFile = async (blob) => {
    const aa = String(nationalCard).split("\\")[1];
    const a = document.createElement("a");
    a.download = aa;
    a.href = URL.createObjectURL(blob);
    // a.addEventListener('click', (e) => {
    // setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    // });
    a.click();
  };

  const getNationalCardHandler = () => {
    fetch(`${process.env.REACT_APP_URL}/admin/getNationalCard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`,
      },
      body: JSON.stringify({
        path: nationalCard,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(`error ${response.status} occured...`);
        }
        return response.blob();
      })
      .then((res) => {
        saveFile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unarchiveHandler = async (archiveId) => {
    await updateList(archiveId);

    fetch(`${process.env.REACT_APP_URL}/admin/unarchiveQueue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${_token}`,
      },
      body: JSON.stringify({
        archiveId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return new Error(`error ${response.status} occured...`);
        }
        return response.json();
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className={`text-[12px]  border-2 p-2 my-5  border-[#ed1c24] rounded-3xl font-bold 
       place-items-center grid grid-cols-8
       screen600:grid-cols-5
       screen340:grid-cols-4
       screen600:gap-0
      ${
        (search === mobile ||
          search === nationalCode ||
          search === firstName ||
          search === lastName) &&
        "bg-rose-400 text-white animate-pulse"
      }
       `}
    >
      <span className="screen600:hidden">{firstName}</span>
      <span className="screen600:hidden">{lastName}</span>
      <span className="ml-2 screen600:hidden">{mobile}</span>
      <span className="mr-4">{nationalCode}</span>
      <span className="mr-4 screen340:hidden">
        <a
          className=" text-[#ed1c24]  text-center rounded-md   my-8 cursor-pointer caret-transparent"
          onClick={getNationalCardHandler}
        >
          دانلود
        </a>
      </span>
      <span>
        {
          _startTime
            .toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            })
            .split(" ")[0]
        }
      </span>

      <span>{moment(startTime).format("jYYYY/jM/jD")}</span>
      <span className="">
        <a
          className=" text-[#ed1c24]  text-center rounded-md   my-8 cursor-pointer caret-transparent"
          onClick={() => unarchiveHandler(id)}
        >
          برگشت
        </a>
      </span>
    </div>
  );
};

export default ArchiveQueueDetails;
