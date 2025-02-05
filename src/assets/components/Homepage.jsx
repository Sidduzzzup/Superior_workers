import React from 'react';

import { motion } from 'framer-motion';


import Second from './Second.jsx'
import Works from './/Works.jsx';
import Testimonials from './Testimonials.jsx';
import Footersection from './Footersection.jsx';
import Counter from './Counter.jsx';
import Subject from './Subject.jsx';






const Homepage = () => {
  return (<>


       
      
    <div className='container grid grid-cols-1 md:grid-cols-2 home-height w-screen'>
    
 
        <div className='flex items-start pt-28'>
       <div>


       <motion.h1 
       initial={{ opacity: 0, x: -200 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
       className='text-yellow-500  font-medium font-archivo pl-3 text-sm sm:text-xl md:text-xl lg:text-xl '>
         100% SATISFACTION GUARANTEE 
      </motion.h1>

      
       <motion.h1 
       initial={{ opacity: 0, x: -200 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
       className=' text-sky-500  font-semibold font-archivo pl-3 pt-4 text-3xl sm:text-2xl md:text-3xl lg:text-5xl '>
         Get Repair in One Click
      </motion.h1>

      <div>
      <motion.p 
       initial={{ opacity: 0, x: -200 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
       className='font-mono text-gray-600 p-4 pt-5 text-sm sm:text-sm md:text-base lg:text-lg'>
        
      Welcome to the ultimate solution for all your home repair needs. Whether it's an electrician, plumber, 
      carpenter, builder, or any other professional, we've got you covered. With just one click, book trusted and skilled workers
       to handle any repair or maintenance task at your convenience. Your home repairs made easy, fast, and reliable!
      </motion.p>
      </div>


      <div className='flex space-x-4 pl-3 pt-10 font-mono hover:scale-125'>
     
      <motion.button 
         initial={{ opacity: 0, x: -200 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
      
      className='border-2 rounded-xl p-2 bg-sky-400 hover:shadow-[10px_13px_10px_rgba(0,0,0,0.4)] hover:bg-yellow-500'>
     Book a Worker
    </motion.button>

  
    <motion.button 
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 50, delay: 0.2 }}

    className='border-x-4 borderbg-sky-600 rounded-xl p-2 hover:shadow-[10px_13px_10px_rgba(0,0,0,0.4)] hover:bg-sky-400'>
     Call Us
    </motion.button>
    </div>

    

      </div>
      </div>
      
       <div className='size-auto flex justify-center items-center  mt-24' >
         <motion.img
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
          className=''
           
          src='./photo_2025-01-11_11-02-37.jpg'
            alt="LOGO" />
            

        </div>

    
       
    </div>
    <Second/>
    <Counter/>
    <Works/>
    <Subject/>
    
    
    <Testimonials/>
    <Footersection/>
    
    </>
  )
}

export default Homepage
