'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

import { motion } from 'framer-motion';

import LoginAnimations from './LoginAnimations';
function Login() {
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <motion.div
        initial={{ y: -150 }}
        animate={{ y: 5 }}
        transition={{ delay: 2, type: 'spring', stiffness: 100 }}
        className="absolute top-0 mt-[80px] text-[40px]"
      >
        {' '}
        STORIES.GPT
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, type: 'ease-out', stiffness: 100 }}
        className="absolute top-0 mt-[130px] text-[20px]"
      >
        {' '}
        Create your Stories with AI.
      </motion.div>

      <div>
        <button onClick={() => signIn('google')}>
          <a className="relative inline-block text-lg group">
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative">SignIn with Google</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </a>
        </button>
      </div>
      <div className="mt-[10px]">
        <button onClick={() => signIn('google')}>
          <a className="relative inline-block text-lg group">
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
              <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
              <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
              <span className="relative">SignIn with Apple</span>
            </span>
            <span
              className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
              data-rounded="rounded-lg"
            ></span>
          </a>
        </button>
      </div>
      <div className="absolute w-[100%] h-[100%]">
        <LoginAnimations />
      </div>
    </div>
  );
}

export default Login;
