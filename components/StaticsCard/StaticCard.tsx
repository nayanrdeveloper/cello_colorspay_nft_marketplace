import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

interface staticCardStruct {
    count: string;
    title: string;
  }

function StatisticsCard(data: staticCardStruct) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });
  return (
    <div data-aos="flip-left">
        <div className='bg-[#24243557] text-center my-auto p-20 rounded-md border border-[#ffffff14]'>
            <span className='text-3xl font-bold text-[#00a3ff]'>{data.count}</span>
            <p className='text-white'>{data.title}</p>
        </div>
    </div>
  )
}

export default StatisticsCard