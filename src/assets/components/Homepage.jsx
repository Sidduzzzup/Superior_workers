import React from 'react';
import { motion } from 'framer-motion';
import Second from './Second.jsx'
import Works from './/Works.jsx';
import Testimonials from './Testimonials.jsx';
import Footersection from './Footersection.jsx';
import Counter from './Counter.jsx';
import Subject from './Subject.jsx';
import LiveProofSection from './LiveProofSection.jsx';


const Homepage = () => {
  return (<>
       
      
    <div className='container grid grid-cols-1 md:grid-cols-2 home-height w-screen'>

    
    <div className='md:hidden size-auto justify-center items-center  mt-24' >
         <motion.img
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
          className=''
           
          src="/DeWatermark.ai_1740228700651_bgremoved.png"
            alt="HOMEPAGE_LOGO" />
            

        </div>

        <div className='flex items-start pt-5 md:pt-28'>
        

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
       className=' text-sky-500  font-bold md:font-semibold font-archivo pl-3 pt-4 text-3xl sm:text-2xl md:text-3xl lg:text-5xl '>
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


      <div className="flex space-x-6 pl-4 pt-12 font-mono mb-5 justify-center md:justify-start">
      
      {/* Book a Worker Button */}
      <motion.button
      onClick={()=>window.location.href='/Works'}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 70, delay: 0.2 }}
        className=" px-2 p-3 md:px-6 md:py-3 text-sm md:text-lg font-semibold text-white bg-sky-500 border-2 border-sky-500 rounded-xl 
                   shadow-lg transition-all duration-300 ease-in-out hover:bg-yellow-500 hover:border-yellow-500 
                   hover:shadow-[8px_10px_15px_rgba(0,0,0,0.3)] scale-100 hover:scale-110" >
                     
       Book a Worker
      </motion.button>

      {/* Call Us Button */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 70, delay: 0.2 }}
        className="px-2 p-3 md:px-6 md:py-3 text-sm md:text-lg  font-semibold text-sky-500 bg-white border-2 border-sky-500 rounded-xl 
                   shadow-lg transition-all duration-300 ease-in-out hover:bg-sky-500 hover:text-white 
                   hover:shadow-[8px_10px_15px_rgba(0,0,0,0.3)] scale-100 hover:scale-110"
      >
        Call Us
      </motion.button>

    </div>

    

      </div>
      </div>
      
       <div className='hidden md:block size-auto justify-center items-center  mt-24' >
         <motion.img
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
          className=''
           
          src="/DeWatermark.ai_1740228700651_bgremoved.png"
            alt="HOMEPAGE_LOGO" />
            

        </div>

    
       
    </div>
    
    <Second/>
    <LiveProofSection/>
    <Counter/>
    <Works/>
    <Subject/>
    
    
    <Testimonials/>
    <Footersection/>
    
    </>
  )
}

export default Homepage

