'use client';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';

// import { useState, useEffect } from 'react';

// import { Orbitron } from 'next/font/google';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="flex justify-center">
        <div className="mt-[100px]">
          <motion.div
            // animate={{ x: 100 }}
            whileInView={{ y: 20 }}
            transition={{ delay: 4 }}
          >
            STORIES.GPT
          </motion.div>
        </div>
      </main>

      <div className="ml-[-350px]">
        <motion.svg
          width="600"
          height="600"
          viewBox="0 0 500 600"
          initial="hidden"
          animate="visible"
        >
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="#ff5554"
            variants={draw}
            custom={1}
          />
          <motion.line
            x1="220"
            y1="30"
            x2="360"
            y2="170"
            stroke="#ffffff"
            variants={draw}
            custom={2}
          />
          <motion.line
            x1="220"
            y1="170"
            x2="360"
            y2="30"
            stroke="#00cc88"
            variants={draw}
            custom={2.5}
          />
          <motion.rect
            width="140"
            height="140"
            x="410"
            y="30"
            rx="20"
            stroke="#87CEEB"
            variants={draw}
            custom={3}
          />
          <motion.circle
            cx="100"
            cy="300"
            r="80"
            stroke="#000000"
            variants={draw}
            custom={2}
          />
          <motion.line
            x1="220"
            y1="230"
            x2="360"
            y2="370"
            stroke="#ff0055"
            custom={3}
            variants={draw}
          />
          <motion.line
            x1="220"
            y1="370"
            x2="360"
            y2="230"
            stroke="#ff0055"
            custom={3.5}
            variants={draw}
          />
          <motion.rect
            width="140"
            height="140"
            x="410"
            y="230"
            rx="20"
            stroke="#F4C2C2"
            custom={4}
            variants={draw}
          />
          <motion.circle
            cx="100"
            cy="500"
            r="80"
            stroke="#ffffff"
            variants={draw}
            custom={3}
          />
          <motion.line
            x1="220"
            y1="430"
            x2="360"
            y2="570"
            stroke="#ffffff"
            variants={draw}
            custom={4}
          />
          <motion.line
            x1="220"
            y1="570"
            x2="360"
            y2="430"
            stroke="#ffffff"
            variants={draw}
            custom={4.5}
          />
          <motion.rect
            width="140"
            height="140"
            x="410"
            y="430"
            rx="20"
            stroke="#ffffff"
            variants={draw}
            custom={5}
          />
        </motion.svg>
      </div>
    </>
  );
}
