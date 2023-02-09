import React, { ReactNode } from 'react';
import ScrollToTop from '@/components/ScrollToTop';

type BaseLayoutProps = {
  children: ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => (
  <>
    <ScrollToTop />
    {children}
  </>
);
export default BaseLayout;
