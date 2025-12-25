
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="relative z-10 w-full px-6 py-8 flex justify-center">
      <div className="w-full max-w-[960px] flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          <div className="size-10 rounded-xl bg-surface-dark border border-border-dark flex items-center justify-center text-primary shadow-lg shadow-primary/20 transition-transform hover:scale-105 cursor-pointer">
            <span className="material-symbols-outlined text-2xl">deployed_code</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight font-brand">
            CesarAc.Me <span className="font-medium text-text-muted mx-1 opacity-70">|</span> Proyecto personal
          </h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
