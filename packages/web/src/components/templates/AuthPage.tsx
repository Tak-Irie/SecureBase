import React, { FC } from 'react';
import Image from 'next/image';

import { Footer } from '../organisms/Footer';
import { Navbar } from '../organisms/Navbar';

export const AuthPage: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <section className="relative w-full h-full py-40 min-h-screen">
        <div className="absolute top-0 w-full h-full bg-gray-900 bg-no-repeat bg-full">
          <Image
            src="/register_bg_2.png"
            alt="Picture of the author"
            layout="fill"
          />
        </div>
        {children}
      </section>
      <Footer />
    </>
  );
};
