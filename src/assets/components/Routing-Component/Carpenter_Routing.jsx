import React from 'react';
import Footersection from '../Footersection';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

const Carpenter_Routing = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/workers/carpenter`);  // Navigates to WorkerList with "plumber"
  };

  return (<>
      <div className='container py-5 md:py-10 grid grid-cols-1 md:grid-cols-2 mb-[110px]'>
      <div className="ml-14">
        <img className=" h-[350px] w-[400px] md:h-[400px] md:absolute md:top-28" src= "/pngfind.com-construction-worker-png-3160821.png"  alt="Plumber" />
      </div>
      <div>
      <motion.div 
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
      className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-5">
          <h1 className="uppercase text-orange-500 font-extrabold text-3xl">
           Carpenter
          </h1>
          <p className=" font-semibold text-base md:text-xl ">
          From furniture repairs to custom woodworking, our
          skilled carpenters are here to provide high-quality work tailored to your needs. </p>

          <div onClick={handleBookNow} className='pt-6'><button className='border-2 rounded-xl font-semibold p-2 bg-sky-400 hover:shadow-[10px_13px_10px_rgba(0,0,0,0.4)] hover:bg-yellow-500'>
     BOOK NOW
    </button> </div> 
    </motion.div>

      </div>
     

    </div>
      
    <Footersection/>
    </>)
}

export default Carpenter_Routing




