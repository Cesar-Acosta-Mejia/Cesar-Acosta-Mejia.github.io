
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProgressCard from './components/ProgressCard';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import ContactForm from './components/ContactForm';

const App: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleSubscribe = (email: string) => {
    console.log(`Subscribed: ${email}`);
    setIsSubscribed(true);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark selection:bg-primary selection:text-white">
      {/* Decorative background elements with animations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-15%] w-[70%] h-[70%] bg-primary/20 blur-[150px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full animate-float [animation-delay:2s]"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full animate-float [animation-duration:15s]"></div>
        <div className="absolute inset-0 bg-hero-glow animate-pulse-glow"></div>
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16 w-full">
        <div className="flex flex-col max-w-[960px] w-full items-center gap-16 md:gap-20">
          
          <Hero onSubscribe={handleSubscribe} isSubscribed={isSubscribed} />

          <div className="w-full flex justify-center pb-10">
            <ProgressCard 
              percentage={15} 
              status="Consolidando la infraestructura del proyecto..." 
            />
          </div>

        </div>
      </main>

      <Footer onOpenContact={() => setIsContactOpen(true)} />
      
      {/* Global Overlays */}
      <AIAssistant />
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
