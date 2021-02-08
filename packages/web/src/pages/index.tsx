import Button from 'components/atoms/Button';
import { Dropdown } from 'components/molecules/Dropdown';
import { Footer } from 'components/organisms/Footer';
import { Navbar } from 'components/organisms/Navbar';
import { NextPage } from 'next';
import Head from 'next/head';

import HomePage from 'components/_pages/home';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>くらしのあんぜんきち | トップページ</title>
      </Head>
      <Navbar />
      <div>
        <Dropdown>
          <Button buttonLabel="test" />
        </Dropdown>
        <HomePage />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
