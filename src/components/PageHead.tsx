import React from 'react';
import Head from 'next/head';
import { FavIcons } from '@volvo-cars/favicons/react';

const PageHead = () => {
  return (
    <Head>
      <title>Volvo frontend code test</title>
      <FavIcons />
    </Head>
  );
};

export default PageHead;
