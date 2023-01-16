import React from 'react';
import { Welcome } from '@/components/Welcome';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle';

const HomePage: React.FC = () => (
  <div>
    <Welcome />
    <ColorSchemeToggle />
  </div>
);
export default HomePage;
