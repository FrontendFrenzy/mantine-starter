import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { ReactNode } from 'react';
import { Open_Sans } from '@next/font/google';
import { NotificationsProvider } from '@mantine/notifications';
import { customColors } from './Colors';

type ThemeProviderProps = {
  children: ReactNode;
  colorScheme: 'light' | 'dark';
  toggleColorScheme: (value?: ColorScheme) => void;
};

const openSans = Open_Sans({
  subsets: ['latin'],
});

const MantineThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  colorScheme,
  toggleColorScheme,
}) => (
  <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider
      theme={{
        colorScheme,
        colors: {
          ...customColors,
        },
        fontFamily: openSans.style.fontFamily,
        headings: { fontFamily: openSans.style.fontFamily, fontWeight: 700 },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider>{children}</NotificationsProvider>
    </MantineProvider>
  </ColorSchemeProvider>
);
export default MantineThemeProvider;
