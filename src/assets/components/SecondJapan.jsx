import React from 'react'
import { motion } from 'framer-motion';



const SecondJapan = () => {
    
    const details = [
        {
          id: 1,
          title: "高度な訓練を受けたスタッフ",
          desc: "私たちの専門ツールのエキスパートは、どんなものでも修理できます。",
          icon: <img className="rounded-lg size-52 md:size-auto" src="/photo_2025-01-11_10-45-36.jpg" alt="配管工" />,
          bgColor: "#0063ff",
          delay: 0.3,
        },
        {
          id: 2,
          title: "24時間365日対応可能",
          desc: "私たちの作業員は、できるだけ早く対応できるよう常に待機しています。",
          link: "/",
          icon: <img className="rounded-lg pt-5 size-52 md:size-auto" src="/photo_2025-01-11_10-45-39.jpg" alt="配管工" />,
          bgColor: "#73bc00",
          delay: 0.6,
        },
        {
          id: 3,
          title: "迅速な対応",
          desc: "私たちのデジタルシステムには、音声・ビデオチャット機能が備わっています。",
          link: "/",
          icon: <img className="rounded-lg size-52 md:size-auto" src="/photo_2025-01-11_10-45-24.jpg" alt="配管工" />,
          bgColor: "#fa6400",
          delay: 0.9,
        },
        {
          id: 4,
          title: "手頃な価格",
          desc: "ご自宅の問題に応じてエキスパートを選んでください。",
          link: "/",
          icon: <img className="rounded-lg size-52 md:size-auto" src="/photo_2025-01-11_10-45-21.jpg" alt="配管工" />,
          bgColor: "#fe6baa",
          delay: 0.9,
        },
      ];
      


  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-3 md:gap-4 font-sans p-10 sm:p-10 md:p-10">
  {
    details.map((item) => (
        <motion.div
        initial={{opacity:0, x: 200}}
        animate={{opacity:1, x: 0}}
        transition={{ delay: 0.3, type: "spring", stiffness: 250 }}
        key={item.id}
        className="inline-flex flex-col items-center flex-grow text-black space-y-3 sm:space-y-4 p-2 sm:p-3 md:p-4 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)] hover:shadow-[0_0_22px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-center hover:scale-110">
          {item.icon}
        </div>
        <h1 className='text-blue-600 text-sm sm:text-md md:text-xl font-semibold'>{item.title}</h1>
        <p className='text-xs sm:text-sm md:text-lg '>{item.desc}</p>
        </motion.div>
    ))
  }
</div>

  )
}

export default SecondJapan


            
