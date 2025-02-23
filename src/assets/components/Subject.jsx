import React from 'react'
import { motion } from "framer-motion";
import { FaComputer, FaBook } from "react-icons/fa6";

const Subject = () => {
    const subjectList = [
        {
          id: 1,
          name: "Free-Consultation",
          icon: <FaComputer />,
          color: "#0063ff",
          delay: 0.2,
        },
       
        {
          id: 3,
          name: "All-Kinds-Works",
          icon: <FaComputer />,
          color: "#922aee",
          delay: 0.4,
        },
        {
          id: 4,
          name: "Ground-Works",
          icon: <FaBook />,
          color: "#ea7516",
          delay: 0.5,
        },
        {
          id: 5,
          name: "Happy-Customers",
          icon: <FaBook />,
          color: "#075267",
          delay: 0.6,
        },
        {
          id: 6,
          name: "Top Service",
          icon: <FaBook />,
          color: "#986d1d",
          delay: 0.7,
        },
        {
          id: 7,
          name: "Highly design",
          icon: <FaBook />,
          color: "#b93838",
          delay: 0.8,
        },
      
      ];
      
  return (
    <div>
        <div className="container py-1 md:py-28">
        {/* header section */}
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto">
          <h1 className="uppercase font-semibold text-orange-500">
            Our Services
          </h1>
          <p className="font-bold text-lg md:text-3xl">
            Reasons For Top Online Bookings in The Indian States
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  mt-5 gap-6'>
       { subjectList.map((item) => (

        <motion.div
        key={item.id}
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          delay: item.delay,
        }}    
         style={{
            color: item.color,
            backgroundColor: item.color + "20",
          }} className='border-2  p-4  border-secondary/20 hover:!scale-110 hover:!shadow-2xl duration-100 cursor-pointer rounded-lg flex justify-start items-center ' >

        <p className=''>{item.icon}</p>

       <h1 className='font-semibold pl-3'>{item.name}</h1>


       </motion.div>
       ))


       }


        </div>



      </div>
    </div>
  )
}

export default Subject


