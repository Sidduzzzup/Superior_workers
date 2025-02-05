import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Works = () => {
  return (
    <div className='container'>
        <div>
        <div className='text-sm bg-orange-300 rounded-xl flex justify-center mx-6 sm:mx-16 p-1'>
            <p className='font-semibold text-xs sm:text-sm'>Book Online Now <span className='text-indigo-600 font-bold'>50% OFF</span> For USA Citizens </p></div>
            </div>

      <div className='grid grid-cols-1 md:grid-cols-2 pt-7'>
      <div className='flex justify-center md:order-1'>
                <motion.img 
                initial={{ opacity: 0, x: -200}}
                animate={{opacity: 1, x: 0}}
                transition={{type: "spring", stiffness: 100, delay: 0.2}}
                 className="ssize-52 md:size-72 " src='./Plumber Bath Sink Water Repair.gif' />
            </div>

          <div className=' md:order-2 flex flex-col items-center'>
          <motion.h1
                    
                    initial={{ opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{type: "spring", stiffness: 80, delay: 0.2}}
                    

                    className=' text-sky-600  text-2xl md:text-3xl font-semibold font-serif p-3'>Plumber Works</motion.h1>
                    <motion.p
                initial={{ opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{type: "spring", stiffness: 80, delay: 0.2}}
                 className='font-mono  text-gray-600 text-xs md:text-sm font-semibold capitalize p-3'> Need a reliable plumber for your home pipe works? We've got you covered! Our skilled professionals
                    are just a click away, ready to fix leaks, install fittings, and handle all your plumbing
                    needs with precision and care. Book now for quick, affordable, and hassle-free service—because
                    your home's comfort is our priority!</motion.p>

                    <div className="flex justify-center md:justify-start hover:scale-110 ">
        <Link to='/PlumberRouting'><motion.button
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            className=" text-black text-sm mb-5 md:text-md rounded-full p-1 px-3 md:p-3 md:px-5 font-semibold bg-sky-500 
                    hover:shadow-[10px_13px_10px_rgba(0,0,0,0.4)] hover:bg-yellow-500 will-change-transform" 
                   style={{
                    transformOrigin: "center", 
                  }}
        >
            Book a Worker
        </motion.button> </Link>
        </div>


          </div>
          
      </div>


      {/* 2222 */}


      <div className='grid grid-cols-1 md:grid-cols-2 pt-7'>
      

          <div className='md:order-1 order-2 md:pl-14 flex flex-col items-center'>
          <motion.h1
                    
                    initial={{ opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{type: "spring", stiffness: 80, delay: 0.2}}
                    

                    className='text-sky-600 text-2xl md:text-3xl font-semibold font-serif p-3'>Builder</motion.h1>
                    <motion.p
                initial={{ opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{type: "spring", stiffness: 80, delay: 0.2}}
                 className='font-mono text-gray-600 text-xs md:text-sm font-semibold capitalize p-3'> Looking for a skilled builder for your home projects? Whether
                 it’s construction, renovation, or
                 home extensions, our expert builders can turn your vision into reality. Get in touch with us for professional and efficient building
                 services!!
                    your home's comfort is our priority!</motion.p>

                    <div className="flex justify-center md:justify-start items-center hover:scale-110">
       <Link to='/BuilderRouting'> <motion.button
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            className="border-2 text-sm mb-5 text-black  md:text-md rounded-full p-1 px-3 md:p-3 md:px-5 font-semibold bg-sky-500 
                   transform transition-transform duration-100 ease-in-out hover:shadow-[10px_13px_10px_rgba(0,0,0,0.4)] hover:bg-yellow-500"
        >
            Book a Worker
        </motion.button> </Link>
        </div>

          </div>
          <div className='flex justify-center order-1 md:order-2'>
                <motion.img 
                initial={{ opacity: 0, x: 200}}
                animate={{opacity: 1, x: 0}}
                transition={{type: "spring", stiffness: 100, delay: 0.2}}
                 className="size-52 md:size-72  " src='./Home Movement Worker.gif' />
            </div>
          
      </div>

      {/* 333 */}

      <div className='grid grid-cols-1 md:grid-cols-2 pt-7'>
      

      <div className='md:order-2 order-2 flex flex-col items-center'>
      <motion.h1
                
                initial={{ opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{type: "spring", stiffness: 80, delay: 0.2}}
                

                className='text-sky-600 text-2xl md:text-3xl font-semibold font-serif p-3'>Electricians</motion.h1>
                <motion.p
            initial={{ opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{type: "spring", stiffness: 80, delay: 0.2}}
             className='font-mono text-gray-600 text-xs md:text-sm font-semibold capitalize p-3'>Have an electrical problem at home? Our certified electricians are ready to tackle any issue, from fixing
                    faulty wiring to installing new fixtures. Book a trusted electrician now to ensure your home’s electrical system is safe and working perfectly!!</motion.p>

                    <div className="flex justify-center md:justify-start items-center  hover:scale-110">
                    <Link to='/Electrician'> <motion.button
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
            className="border-2 text-sm mb-5 text-black  md:text-md rounded-full p-1 px-3 md:p-3 md:px-5 font-semibold bg-sky-500 
                   transform transition-transform duration-100 ease-in-out hover:shadow-[10px_13px_10px_rgba(0,0,0,0.4)] hover:bg-yellow-500"
        >
            Book a Worker
        </motion.button></Link>
        </div>

      </div>
      <div className='flex justify-center order-1 md:order-1'>
            <motion.img 
            initial={{ opacity: 0, x: -200}}
            animate={{opacity: 1, x: 0}}
            transition={{type: "spring", stiffness: 100, delay: 0.2}}
             className="size-52 md:size-72  " src='./Electrical Electrician Working.gif' />
        </div>
      
  </div>

  {/* 4444 */}


  <div className='grid grid-cols-1 md:grid-cols-2 pt-7'>
      

      <div className='md:order-1 order-2 md:pl-14 flex flex-col items-center'>
      <motion.h1
                
                initial={{ opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{type: "spring", stiffness: 80, delay: 0.2}}
                

                className='text-sky-600 text-2xl md:text-3xl font-semibold font-serif p-3'>Carpenter</motion.h1>
                <motion.p
            initial={{ opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{type: "spring", stiffness: 80, delay: 0.2}}
             className='font-mono text-gray-600 text-xs md:text-sm font-semibold capitalize p-3'> Need carpentry services for your home? From furniture repairs to custom woodworking, our
                    skilled carpenters are here to provide high-quality work tailored to your needs. Reach out to us for expert craftsmanship and reliable service</motion.p>

                    <div className="flex justify-center md:justify-start items-center  hover:scale-110">
        <motion.button
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
            className="border-2 text-sm mb-5 text-black  md:text-md rounded-full p-1 px-3 md:p-3 md:px-5 font-semibold bg-sky-500 
                   transform transition-transform ease-in-out hover:shadow-[10px_13px_10px_rgba(0,0,0,0.4)] hover:bg-yellow-500"
        >
            Book a Worker
        </motion.button>
        </div>

      </div>
      <div className='flex justify-center order-1 md:order-2'>
            <motion.img 
            initial={{ opacity: 0, x: -200}}
            animate={{opacity: 1, x: 0}}
            transition={{type: "spring", stiffness: 100, delay: 0.2}}
             className="size-52 md:size-72  " src='./Carpenter Worker.gif' />
        </div>
      
  </div>


    </div>
  )
}

export default Works
