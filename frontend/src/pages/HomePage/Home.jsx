import React from 'react';
import Hero from './Hero'; 
import Features from './Features';
import Stats from './Stats';
import Process from './Process';
import WhyChoose from './WhyChoose';
import Pricing from './Pricing';
import CTA from './CTA';

const Home = () => {
  return (
    <main>
        <Hero />
        <Features /> 
        <Stats />
        <Process />
        <WhyChoose />
        <Pricing />
        <CTA />
      
    </main>
  );
};

export default Home;