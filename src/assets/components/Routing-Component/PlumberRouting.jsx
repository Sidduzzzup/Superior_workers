import React from 'react';
import Footersection from '../Footersection';

import { motion } from 'framer-motion';

const PlumberRouting = () => {
  return (<>
      <div className='container py-5 md:py-10 grid grid-cols-1 md:grid-cols-2'>
      <div>
        <img src= "./public\photo_2025-01-11_10-45-30.jpg"  alt="Plumber" />
      </div>
      <div>
      <motion.div 
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
      className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-orange-500">
            Plumber Chaos
          </h1>
          <p className="font-semibold text-3xl">
           We Have Highly Experienced Plumbers in United States
          </p>

          <div className='pt-6'><button className='border-2 rounded-xl font-semibold p-2 bg-sky-400 hover:shadow-[10px_13px_10px_rgba(0,0,0,0.4)] hover:bg-yellow-500'>
     BOOK NOW
    </button></div>
    </motion.div>

      </div>
     

    </div>
      
    <Footersection/>
    </>)
}

export default PlumberRouting




