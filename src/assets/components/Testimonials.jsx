import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import { Key } from '@mui/icons-material';
import { motion } from 'framer-motion';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    review: 'This product changed my life! The quality is amazing and the support team is great.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    delay: 0.2,
    
  },
  {
    id: 2,
    name: 'Jane Smith',
    review: 'I highly recommend this to everyone. It does exactly what it promises, and more!',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    delay: 0.3,
  },
  {
    id: 3,
    name: 'Alex Johnson',
    review: 'Affordable and reliable. The best investment I’ve made this year.',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    delay: 0.4,
  },
  {
    id: 4,
    name: 'John Doe',
    review: 'This product changed my life! The quality is amazing and the support team is great.',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    delay: 0.5,
  },
  {
    id: 5,
    name: 'Jane Smith',
    review: 'I highly recommend this to everyone. It does exactly what it promises, and more!',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    delay: 0.6,  
},
  {
    id: 6,
    name: 'Alex Johnson',
    review: 'Affordable and reliable. The best investment I’ve made this year.',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    delay: 0.7,
  },
  {
    id: 7,
    name: 'Jane Smith',
    review: 'I highly recommend this to everyone. It does exactly what it promises, and more!',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    delay: 0.8,
  },
  {
    id: 8,
    name: 'Alex Johnson',
    review: 'Affordable and reliable. The best investment I’ve made this year.',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    delay: 0.9,
  },
];

const TestimonialSection = () => {
    const value = 4.5;
    return (
        <>


              
            <div><h2 className='flex justify-center align-middle text-orange-500 font-bold text-xl pt-36'>OUR TESTIMONIALS</h2></div>
            <div><h1 className='flex justify-center align-middle content-center p-4 font-bold text-3xl'> What Our Customers Say About Us</h1></div>
            
        

          <div className="grid grid-cols-1 md:grid-cols-4 p-12 gap-8">
            {testimonials.map((item) => (
              <div className={`hover:scale-110 ${item.id > 4  ? 'hidden md:block' : '' } `}>
              <motion.div
              initial={{opacity:0, x: 200}}
              animate={{opacity:1, x: 0}}
              transition={{ delay: item.delay, type: "spring", stiffness: 150 }}
              enableScrollSpy={true}
              scrollSpyOnce={true}
              
               key={item.id}
                className="bg-slate-200 rounded-lg p-5 shadow-xl space-y-4 h-full">
                {/* Avatar and Name Section */}
                <div className="flex items-center space-x-4">
                  <img
                    className="rounded-full w-16 h-16"
                    src={item.avatar}
                    alt="picture"
                  />
                  <h1 className="font-sans text-lg font-semibold">{item.name}</h1>
                </div>
      
                {/* Review Section */}
                <p className="text-gray-600 text-sm font-serif leading-relaxed">
                  {item.review}
                </p>
                <div className='overflow-hidden'>

                <Box
  sx={{
    width: { md: '130px', lg: '200px' }, // Responsive width
    height: { md: 'auto', lg: '50px' }, // Auto height for smaller devices, fixed for larger devices
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures proper spacing between elements
    overflow: 'hidden', // Prevents overflow
    textOverflow: 'ellipsis', // Handles text overflow gracefully
    whiteSpace: 'nowrap', // Prevents text wrapping
  }}
>
  <Rating
    name="text-feedback"
    value={value}
    readOnly
    precision={0.5}
    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
    sx={{
      fontSize: { xs: '1rem', sm: '1.5rem' }, // Adjust star size for smaller devices
    }}
  />
  <Box
    sx={{
      ml: { xs: 1, sm: 2 }, // Margin adjustment
      fontSize: { xs: '0.8rem', sm: '1rem' }, // Smaller font size for mobile
      textAlign: 'left', // Align text for proper visibility
      overflow: 'hidden', // Prevents text overflow
      textOverflow: 'ellipsis', // Handles truncated text gracefully
    }}
  >
    {labels[value]}
  </Box>
</Box>
</div>




              </motion.div>
              </div>
            ))}
          </div>
        </>
      );
      
}
export default TestimonialSection;
