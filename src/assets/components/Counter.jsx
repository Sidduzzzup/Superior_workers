// import React from 'react'
// import CountUp from 'react-countup';

// const Counter = () => {
//   return (
//     <div>
//       <div className="grid grid-cols-2 md:grid-cols-4 bg-sky-500 rounded-lg p-3 md:p-3 m-10 gap-5 md:gap-10 ">
//       <div className='flex flex-col items-center justify-center'>
//       <p className='font-bold'><CountUp start={0} end={1000} duration={8} enableScrollSpy={true} enableSpyOnce={true} separator=',' suffix='+'/></p>
//         <h1 className='font-semibold'>Experts</h1>
//       </div>
//       <div className='flex flex-col items-center justify-center'>
//       <p className='font-bold'><CountUp start={0} end={85600} duration={8} enableScrollSpy={true} enableSpyOnce={true} separator=',' suffix='+'/></p>
//         <h1 className='font-semibold' >Customer</h1>
//       </div>
//       <div className='flex flex-col items-center justify-center'>
//       <p className='font-semibold'><CountUp start={0} end={23} duration={8} enableScrollSpy={true} enableSpyOnce={true} separator=',' suffix='+'/></p>
//         <h1 className='font-semibold'>Offers</h1>
//       </div>
//       <div className='flex flex-col items-center justify-center flex-shrink '>
//       <p className='font-bold whitespace-nowrap '><CountUp start={0} end={40} duration={8} enableScrollSpy={true} enableSpyOnce={true} separator=',' suffix='+'/></p>
//         <h1 className='font-semibold whitespace-nowrap'>Branch Across US</h1>
//       </div>
 


//       </div>
      
//     </div>
//   )
// }

// export default Counter


import React from 'react';
import CountUp from 'react-countup';

const Counter = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 bg-sky-500 rounded-lg p-3 md:p-3 m-10 gap-5 md:gap-10">
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold">
            <CountUp start={0} end={1000} duration={8} separator="," suffix="+" />
          </p>
          <h1 className="font-semibold">Experts</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold">
            <CountUp start={0} end={85600} duration={8} separator="," suffix="+" />
          </p>
          <h1 className="font-semibold">Customer</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold">
            <CountUp start={0} end={23} duration={8} separator="," suffix="+" />
          </p>
          <h1 className="font-semibold">Offers</h1>
        </div>
        <div className="flex flex-col items-center justify-center flex-shrink">
          <p className="font-bold whitespace-nowrap">
            <CountUp start={0} end={40} duration={8} separator="," suffix="+" />
          </p>
          <h1 className="font-semibold whitespace-nowrap">Branch Across US</h1>
        </div>
      </div>
    </div>
  );
};

export default Counter;


