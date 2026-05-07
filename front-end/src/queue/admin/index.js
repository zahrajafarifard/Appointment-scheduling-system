import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { adminLogOut } from "../../store/adminAction";
import ConfigDaysOFYear from "./components/configDaysOFYear";
import AdvancedConfigDaysOFYear from "./components/advancedConfigDaysOfYear";
import QueueList from "./queueList";
import ArchiveQueueList from "./archiveQueueList";
import RequestManagment from "./requestManagment";
import Telmis from "../../assets/images/logo telmis-01.svg";
import Background from "../../assets/images/back2-01.svg";

const Main = () => {
  const [showAdvncedComponent, setShowAdvncedComponent] = useState(false);
  const [showConfigComponent, setShowConfigComponent] = useState(false);
  const [showQueueComponent, setShowQueueComponent] = useState(false);
  const [showArchiveQueueComponent, setShowArchiveQueueComponent] =
    useState(false);
  const [showRequestComponent, setShowRequestComponent] = useState(false);
  // const [token, setToken] = useState(useSelector(state => state.adminReducer.token))

  const dispatchRedux = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // show text in red for the first time
    setShowConfigComponent(true);
  }, []);

  const advanceConfigHandler = () => {
    setShowQueueComponent(false);
    setShowArchiveQueueComponent(false);
    setShowRequestComponent(false);
    setShowConfigComponent(false);
    setShowAdvncedComponent(true);
  };

  const requestHandler = () => {
    setShowQueueComponent(false);
    setShowAdvncedComponent(false);
    setShowArchiveQueueComponent(false);
    setShowConfigComponent(false);
    setShowRequestComponent(true);
  };
  const ConfigHandler = () => {
    setShowQueueComponent(false);
    setShowAdvncedComponent(false);
    setShowArchiveQueueComponent(false);
    setShowRequestComponent(false);
    setShowConfigComponent(true);
  };

  const logOutHandler = () => {
    dispatchRedux(adminLogOut());
    navigate("/admin/login", { replace: true });
  };
  const listHandler = () => {
    setShowAdvncedComponent(false);
    setShowConfigComponent(false);
    setShowRequestComponent(false);
    setShowArchiveQueueComponent(false);
    setShowQueueComponent(true);
  };
  const ArchiveQueueHandler = () => {
    setShowAdvncedComponent(false);
    setShowRequestComponent(false);
    setShowConfigComponent(false);
    setShowQueueComponent(false);
    setShowArchiveQueueComponent(true);
  };

  let tempComponent;
  tempComponent = <ConfigDaysOFYear />;
  if (showAdvncedComponent) {
    tempComponent = <AdvancedConfigDaysOFYear />;
  }
  if (showConfigComponent) {
    tempComponent = <ConfigDaysOFYear />;
  }
  if (showQueueComponent) {
    tempComponent = <QueueList />;
  }
  if (showArchiveQueueComponent) {
    tempComponent = <ArchiveQueueList />;
  }
  if (showRequestComponent) {
    tempComponent = <RequestManagment />;
  }
  return (
    <div
      style={{
        fontFamily: "IranSansWeb",
        backgroundImage: `url(${Background})`,
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
      }}
      className="font-face grid content-start h-screen border-red-700  "
    >
      <div className="m-10  w-fit screen500:m-6 border place-self-end ">
        <img
          src={Telmis}
          width={200}
          height={99}
          className="screen500:w-[90%] screen500:h-[60px] caret-transparent"
          alt="logo12"
        />
      </div>

      <div
        className="  w-[92%] mx-auto
        flex flex-row-reverse  
        screen950:grid  "
      >
        <div
          className={`border-0 border-l-2 border-gray-500  mx-14 flex flex-col   w-40 pl-4 font-bold caret-transparent  
          screen950:flex-row-reverse screen950:border-0 screen950:mb-8 screen950:w-full screen950:mx-0 screen950:gap-x-6 screen700:text-[12px] screen600:gap-x-2  screen900:pl-0
          screen900:text-[13px]
          screen500:text-[10px]
          screen470:text-[9.7px]
         
        
         `}
        >
          <span
            className={`cursor-pointer   ${
              showConfigComponent && "text-[#ed1c24]"
            }`}
            onClick={ConfigHandler}
          >
            تنظیمات
          </span>
          <span
            className={`cursor-pointer my-2 screen950:my-0 ${
              showAdvncedComponent && "text-[#ed1c24]"
            }
              
              `}
            onClick={advanceConfigHandler}
          >
            تنظیمات پیشرفته
          </span>
          <span
            className={` cursor-pointer mb-2 ${
              showRequestComponent && "text-[#ed1c24]"
            }`}
            onClick={requestHandler}
          >
            مدیریت درخواست
          </span>
          <span
            className={` cursor-pointer ${
              showQueueComponent && "text-[#ed1c24]"
            }`}
            onClick={listHandler}
          >
            لیست نوبت ها
          </span>
          <span
            className={` cursor-pointer my-2 screen950:my-0 ${
              showArchiveQueueComponent && "text-[#ed1c24]"
            }`}
            onClick={ArchiveQueueHandler}
          >
            آرشیو نوبت ها
          </span>
          <span className="cursor-pointer " onClick={logOutHandler}>
            خروج
          </span>
        </div>
        <div className="">{tempComponent}</div>
      </div>
    </div>
  );
};

export default Main;
