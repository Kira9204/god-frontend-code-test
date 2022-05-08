import React from 'react';
import { AppProps } from 'next/app';
import { StyleProvider, ThemePicker } from 'vcc-ui';

import '../public/css/styles.css';
import PageHead from '../src/components/PageHead';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <PageHead />
        <Component {...pageProps} />
      </ThemePicker>
    </StyleProvider>
  );
};

export default MyApp;
