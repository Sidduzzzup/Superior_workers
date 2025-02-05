import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaRocket, FaMagic } from "react-icons/fa";

const EmailConfirmationSuccess = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const funMessages = [
    "Your email is zooming through cyberspace! 🚀",
    "Message dispatched with magical precision ✨",
    "Your words are now on an epic digital journey 🌟"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funMessages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setShowMessage(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const iconVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary/80 to-chart-3/80 backdrop-blur-sm z-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full mx-4 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-chart-1 via-chart-3 to-chart-5"></div>
        
        <motion.div
          variants={iconVariants}
          initial="initial"
          animate="animate"
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <FaEnvelope className="text-6xl text-primary" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2"
            >
              <FaMagic className="text-2xl text-chart-1" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-heading font-heading text-center mb-4 text-foreground"
        >
          Message Sent Successfully!
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-6"
        >
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-body text-accent mb-4"
          >
            {funMessages[messageIndex]}
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-sm font-heading text-foreground mb-2">What's Next?</h3>
            <p className="text-sm text-accent">Check your inbox for our confirmation email. It should arrive faster than a caffeine rush! ⚡</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 transition-colors hover:bg-primary/90"
          >
            <FaRocket className="text-lg" />
            <a href="https://mail.google.com" className="text-sm text-white">Wana Visit Gmail</a>
          </motion.button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-accent">Didn't receive an email? Check your spam folder or contact support.</p>
          
        </div>
      </motion.div>
    </div>
  );
};

export default EmailConfirmationSuccess;