
import React from 'react';

interface FooterProps {
  onOpenContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full px-6 py-10 border-t border-border-dark/20 bg-background-dark/30 backdrop-blur-md mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-[960px] mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-text-muted text-sm font-normal text-center md:text-left">
            © {currentYear} Cesarac.me | Proyecto Personal. Todos los derechos reservados.
          </p>
          <p className="text-text-muted/40 text-[10px] uppercase tracking-widest">
          </p>
        </div>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={onOpenContact}
            className="text-text-muted hover:text-primary transition-all group relative cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-125 group-hover:-rotate-12 transition-transform">mail</span>
            <span className="sr-only">Email</span>
          </button>
          
          <a 
            href="https://wa.me/524435073367" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted hover:text-[#25D366] transition-all group"
          >
            <svg className="w-6 h-6 fill-current group-hover:scale-125 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
            </svg>
            <span className="sr-only">WhatsApp</span>
          </a>
          
          <a 
            href="https://discord.gg/zV8a9CxBQA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted hover:text-[#5865F2] transition-all group"
          >
            <svg className="w-6 h-6 fill-current group-hover:scale-125 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037 13.684 13.684 0 00-.594 1.226 18.253 18.253 0 00-5.462 0 14.35 14.35 0 00-.603-1.226.072.072 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 00-1.872-.892.077.077 0 00-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 00.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 00.078.01c.12.098.246.198.373.292a.077.077 0 00-.006.127 12.299 12.299 0 00-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"></path>
            </svg>
            <span className="sr-only">Discord</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
