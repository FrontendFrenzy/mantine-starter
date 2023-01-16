import { ColorScheme, ColorSchemeProvider } from '@mantine/core';
// @ts-ignore
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getCookie, setCookie } from 'cookies-next';
import NextApp, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import MantineThemeProvider from '@/theme/ThemeProvider';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const [queryClient] = useState(() => new QueryClient());

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
        <title>Employee Managment System</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineThemeProvider colorScheme={colorScheme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MantineThemeProvider>
      </ColorSchemeProvider>
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
