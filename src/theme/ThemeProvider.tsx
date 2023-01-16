import { MantineProvider } from '@mantine/core';
import React, { ReactNode } from 'react';
import { customColors } from './Colors';

type ThemeProviderProps = {
  children: ReactNode;
  colorScheme: 'light' | 'dark';
};

const MantineThemeProvider: React.FC<ThemeProviderProps> = ({ children, colorScheme }) => (
  <MantineProvider
    theme={{
      colorScheme,
      colors: {
        ...customColors,
      },
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    {children}
  </MantineProvider>
);
export default MantineThemeProvider;
