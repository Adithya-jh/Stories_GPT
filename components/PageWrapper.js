'use client';

import React from 'react';
import { motion } from 'framer-motion';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="h-[100vh] w-[100vw]"
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;
