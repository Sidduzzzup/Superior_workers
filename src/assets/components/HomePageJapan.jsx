import React from 'react';
import { motion } from 'framer-motion';
import Second from './Second.jsx'
import Works from './/Works.jsx';
import Testimonials from './Testimonials.jsx';
import Footersection from './Footersection.jsx';
import Counter from './Counter.jsx';
import Subject from './Subject.jsx';
import LiveProofSection from './LiveProofSection.jsx';
import SecondJapan from './SecondJapan.jsx';


const HomepageJapan = () => {
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
         100%満足保証
      </motion.h1>

      
       <motion.h1 
       initial={{ opacity: 0, x: -200 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
       className=' text-sky-500  font-special pl-3 pt-4 text-2xl sm:text-2xl md:text-3xl lg:text-5xl '>
         ワンクリックで修理を依頼
      </motion.h1>

      <div>
      <motion.p 
       initial={{ opacity: 0, x: -200 }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
       className='font-helvetica text-lg text-gray-500 p-4 pt-5 sm:text-sm md:text-lg'>
        
        あらゆる住宅修理のニーズに応える究極のソリューションへようこそ。電気技師、配管工、大工、建築業者など、どんな専門家でも、私たちが対応いたします。クリックひとつで、信頼できる熟練の作業員をご予約いただけます。
        ご都合に合わせて、あらゆる修理やメンテナンス作業を承ります。住宅修理を簡単、迅速、そして確実に！
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
                     
                     作業員を予約する
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
        お電話ください
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
    <SecondJapan/>

    <LiveProofSection/>
    <Counter/>
    <Works/>
    <Subject/>
    
    
    <Testimonials/>
    <Footersection/>
    
    </>
  )
}

export default HomepageJapan

