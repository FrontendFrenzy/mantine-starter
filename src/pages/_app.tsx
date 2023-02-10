import { ColorScheme } from '@mantine/core';
import { getCookie, setCookie } from 'cookies-next';
import { NextPage } from 'next';
import NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';
import MantineThemeProvider from '@/theme/ThemeProvider';
import { QueryWrapper } from '@/lib';
import { BaseLayout } from '@/layout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(props: AppPropsWithLayout & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const getLayout = Component.getLayout ?? ((page) => <BaseLayout>{page}</BaseLayout>);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <>
      <Head>
        <title>Starter Project</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <QueryWrapper dehydratedState={pageProps.dehydratedState}>
        <MantineThemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          {getLayout(<Component {...pageProps} />)}
        </MantineThemeProvider>
      </QueryWrapper>
    </>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};
