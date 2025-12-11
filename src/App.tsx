import React from 'react';
import Background from './components/Background';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Stacks from './components/Stacks';
import About from './components/About';
import Works from './components/Works';
import Contact from './components/Contact';

import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div>
        <Background />
        <Layout>
          <Hero />
          <Stacks />
          <About />
          <Works />
          <Contact />
        </Layout>
      </div>
    </LanguageProvider>
  );
}

export default App;
