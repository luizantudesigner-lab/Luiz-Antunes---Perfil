import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Approach } from './components/Approach';
import { TechStack } from './components/TechStack';
import { Trajectory } from './components/Trajectory';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="min-h-screen bg-brand-light text-brand-dark font-sans selection:bg-brand-dark selection:text-brand-light">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Approach />
          <TechStack />
          <Trajectory />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;