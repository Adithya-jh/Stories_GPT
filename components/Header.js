import React from 'react';
import { useSession, signOut } from 'next-auth/react';

function Header() {
  const { data: session } = useSession();
  return (
    <div className="absolute top-2 right-0">
      {session && (
        <div className="flex mr-[20px]">
          <h3 className="mt-[12px]">
            {/* Welcome <span className="text-[#94e5ef]"> {session.user.name}</span> */}
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
  );
}

export default Header;
