

import React  , { useEffect, useState }from 'react'
// import font from '../../App.module.css'

import Mobile from '../queue/mobile'
import BTN from '../assets/images/dokmeh-01.svg'


export default function Home ({setMsg}) {

  const [queueBtn, setQueueBtn] = useState(false)

  

  const queueBtnHandler = () => {
    setQueueBtn(true)
  }

  return (
    <div style={{fontFamily:'IranSansWeb'}} className='font-face'>
      <div
        style={{ direction: 'rtl' }}
        className={` mx-auto w-[600px] my-9 grid grid-cols-3 text-[#0a1c54] ${queueBtn &&
          'hidden'}
        
        screen700:grid-cols-1
        screen700:w-[350px]
        screen430:w-[270px]
        `}
      >
        <div className=" col-start-1 col-end-2 mt-6
        screen700:col-start-0 screen700:col-end-1  screen700:w-64 screen700:mx-auto screen700:ml-16
        ">
          <img src={BTN} width={150}  alt="logo12" />
        </div>

        <div className=" col-start-2 col-end-4 tracking-wide p-3
        screen700:col-start-0 screen700:col-end-1

        ">
          <div className="text-[35.5px] font-bold text-[#0a1c54] text-center 
          screen700:text-[30.5px]
          screen430:text-[1.43rem]
          ">
            با یک کلیک نفر
            <span className="text-[#bd9d62] font-bold text-md"> اول</span> باش
          </div>
          <div className="text-[14px] font-semibold text-justify
          screen700:pl-0
          ">
            با دریافت <span className="font-extrabold ">نوبت</span> و دریافت وقت
            قبلی با امنیت و خاطری آسوده در سریع ترین زمان ممکن خدمات ارزی خودرا
            انجام دهید
          </div>
          <br />
          <div className="flex font-semibold text-justify
          screen550:flex-col

           ">
            <div className="text-[12px] tracking-normal
            screen700:text-[11px]
            screen700:text-center
            screen700:mb-2
            screen700:font-bold
            ">
              برای دریافت نوبت بر روی دکمه مقابل کلیک کنید
            </div>

            <div className=" screen700:text-center -mt-1">
              <button
                onClick={queueBtnHandler}
                className=" text-[13px] px-2  h-6 font-bold mr-2 bg-[#0ab954] text-white rounded-xl cursor-pointer
              "
              >
                دریافت نوبت
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>{queueBtn && <Mobile />}</div>

    

      </div>
    </div>
  )
}
