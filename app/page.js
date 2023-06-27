'use client';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import Button from '@/components/Button';
import { useSession, signOut } from 'next-auth/react';

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
  const textRef = useRef(null);
  useEffect(() => {
    const textElement = textRef.current;
    const text = textElement.textContent;
    const textLength = text.length;
    const typingSpeed = 100; // Adjust typing speed (in milliseconds)

    let i = 0;
    textElement.textContent = '';

    const type = () => {
      if (i < textLength) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, typingSpeed);
      }
    };

    type();
  }, []);

  const { data: session } = useSession();
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <main className="flex flex-col justify-center mb-[10px]">
        <div className="absolute top-2 right-0">
          {session && (
            <div className="flex mr-[20px]">
              <h3 className="mt-[12px]">
                Welcome{' '}
                <span className="text-[#94e5ef]"> {session.user.name}</span>
              </h3>
              <img
                className="h-12 w-12 rounded-full ml-[50px] cursor-pointer mx-auto hover:opacity-50"
                src={session.user.image}
                alt="user image"
                onClick={() => signOut()}
              />
            </div>
          )}
        </div>
        <div className="mt-[100px]">
          <motion.div
            // animate={{ x: 100 }}
            initial={{ y: -150 }}
            animate={{ y: 50 }}
            transition={{ delay: 3, type: 'spring', stiffness: 100 }}
            // animate={{ x: 100 }}
            // transition={{ t, stiffness: 100 }}
          >
            STORIES.GPT
          </motion.div>

          <div className="mt-[60px] typingAnimation">
            <span ref={textRef} className="typingText w-[1000px]">
              Unleash your imagination with AI.
            </span>
          </div>
        </div>
        {/* <motion.div
          className="mt-[200px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.25 },
          }}
        >
          <a
            href="/premise"
            class="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
          >
            <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span class="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              GET STARTED
            </span>
          </a>
        </motion.div> */}
        <Button path="/flow" title="GET STARTED" delay={5} />
      </main>

      <div className="ml-[-350px] mb-[100px] z-[-2] absolute top-[80px]">
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

      <div>
        <div className="ml-[1110px] mb-[100px] z-[-2] fixed top-[80px]">
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
              stroke="yellow"
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
      </div>
    </>
  );
}
