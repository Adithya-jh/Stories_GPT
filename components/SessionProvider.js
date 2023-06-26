'use client';
import React from 'react';
import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

function SessionProvider({ children, session }) {
  return <Provider>{children}</Provider>;
}

export default SessionProvider;
