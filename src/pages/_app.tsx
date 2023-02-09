import { ColorScheme, ColorSchemeProvider } from '@mantine/core';
// @ts-ignore
import { getCookie, setCookie } from 'cookies-next';
import NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import MantineThemeProvider from '@/theme/ThemeProvider';
import ReactQueryWrapper from '@/lib/ReactQueryWrapper';
import { BaseLayout } from '@/layout';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

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
        <title>Scan Me Project</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ReactQueryWrapper dehydratedState={pageProps.dehydratedState}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineThemeProvider colorScheme={colorScheme}>
            <BaseLayout>
              <Component {...pageProps} />
            </BaseLayout>
          </MantineThemeProvider>
        </ColorSchemeProvider>
      </ReactQueryWrapper>
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
