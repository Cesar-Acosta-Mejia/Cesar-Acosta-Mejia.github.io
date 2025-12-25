
import React, { useState, useEffect } from 'react';

interface HeroProps {
  onSubscribe: (email: string) => void;
  isSubscribed: boolean;
}

const WORDS = ["Emprendimientos", "Proyectos", "Escolares", "Curriculum", "Gestion"];

const COLORS = [
  { bg: "bg-blue-600/20", border: "border-blue-500/40", text: "text-blue-300" },
  { bg: "bg-indigo-600/20", border: "border-indigo-500/40", text: "text-indigo-300" },
  { bg: "bg-sky-600/20", border: "border-sky-500/40", text: "text-sky-300" },
  { bg: "bg-primary/20", border: "border-primary/40", text: "text-blue-400" },
  { bg: "bg-blue-800/20", border: "border-blue-700/40", text: "text-blue-200" },
];

const Hero: React.FC<HeroProps> = ({ onSubscribe, isSubscribed }) => {
  const [email, setEmail] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing');
  const [waitStep, setWaitStep] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const fullWord = WORDS[wordIndex];
      
      if (phase === 'typing') {
        if (currentText.length < fullWord.length) {
          setCurrentText(fullWord.substring(0, currentText.length + 1));
          setTypingSpeed(120);
        } else {
          setPhase('waiting');
          setWaitStep(0);
          setTypingSpeed(400);
        }
      } else if (phase === 'waiting') {
        // Secuencia de puntos: Gestion -> Gestion. -> Gestion.. -> . Gestion.
        if (waitStep === 0) {
          setCurrentText(fullWord + ".");
          setWaitStep(1);
        } else if (waitStep === 1) {
          setCurrentText(fullWord + "..");
          setWaitStep(2);
        } else if (waitStep === 2) {
          setCurrentText(fullWord + " .");
          setWaitStep(3);
        } else {
          setPhase('deleting');
          setTypingSpeed(60);
        }
      } else if (phase === 'deleting') {
        // Quitamos los puntos decorativos antes de borrar la palabra real
        const cleanWord = currentText.replace(/[. ]/g, '');
        if (cleanWord.length > 0) {
          const nextLength = cleanWord.length - 1;
          setCurrentText(fullWord.substring(0, nextLength));
        } else {
          setPhase('typing');
          setWordIndex((prev) => (prev + 1) % WORDS.length);
          setTypingSpeed(150);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, phase, wordIndex, typingSpeed, waitStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
      setEmail('');
    }
  };

  const currentStyles = COLORS[wordIndex % COLORS.length];

  return (
    <div className="w-full max-w-3xl flex flex-col items-center text-center gap-10">
      {/* Badge dinámico con alineación horizontal perfecta y ajuste de ancho suave */}
      <div 
        className={`inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full border backdrop-blur-md transition-all duration-700 ease-in-out min-h-[42px] ${currentStyles.bg} ${currentStyles.border}`}
      >
        {/* Contenedor del círculo con alineación centrada */}
        <div className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-primary"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </div>
        
        {/* Contenedor del texto con alineación vertical corregida */}
        <div className="flex items-center h-full">
          <span 
            className={`text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-700 leading-none flex items-center ${currentStyles.text}`}
          >
            {currentText}
            <span className="inline-block w-[2px] h-3 ml-1.5 bg-current animate-pulse opacity-70"></span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
          Proyecto Personal <br />
          <span className="text-primary">En Mantenimiento</span>
        </h1>
        <p className="text-text-muted text-lg sm:text-xl font-normal max-w-xl mx-auto leading-relaxed">
          Actualmente estamos trabajando en la infraestructura para ofrecer una mejor experiencia. Sé de los primeros en volver cuando esté listo.
        </p>
      </div>

      <div className="w-full max-w-lg mt-6 flex justify-center">
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="w-full group animate-in fade-in duration-500">
            <div className="relative flex w-full flex-col">
              <div className="relative flex w-full items-stretch rounded-2xl h-16 shadow-2xl shadow-primary/5 transition-all focus-within:shadow-primary/20">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <input
                  type="email"
                  required
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-2xl text-white focus:outline-0 focus:ring-2 focus:ring-primary/40 border border-border-dark bg-surface-dark h-full placeholder:text-text-muted/60 pl-14 pr-[150px] text-lg font-normal transition-all"
                  placeholder="Introduce tu correo..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute inset-y-2 right-2">
                  <button
                    type="submit"
                    className="flex h-full items-center justify-center rounded-xl bg-primary hover:bg-blue-600 px-8 text-white text-base font-bold tracking-wide transition-all active:scale-95 shadow-lg shadow-primary/30"
                  >
                    Avísame
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-text-muted/70 flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-sm">lock</span>
              Respetamos tu privacidad. No spam.
            </p>
          </form>
        ) : (
          <div className="w-full p-8 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm animate-in zoom-in-95 duration-500">
            <div className="flex flex-col items-center gap-3">
              <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">¡Registro Exitoso!</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Gracias por tu interés. Te enviaremos un correo electrónico en cuanto el sitio esté completamente operativo.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
