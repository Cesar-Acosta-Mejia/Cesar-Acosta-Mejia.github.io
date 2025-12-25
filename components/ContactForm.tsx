
import React, { useState } from 'react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ email: '', message: '' });
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Absolute backdrop for click-outside to close */}
      <div 
        className="fixed inset-0 bg-background-dark/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Container: centered via flex parent */}
      <div className="relative w-full max-w-md bg-surface-dark border border-border-dark rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 fade-in duration-300 transform-gpu">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors p-2"
          aria-label="Cerrar formulario"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3">
            <span className="material-symbols-outlined text-2xl">mail</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Contacto</h3>
          <p className="text-text-muted text-xs uppercase tracking-widest mt-1">CesarAc.Me | Proyecto Personal</p>
        </div>

        {status === 'success' ? (
          <div className="py-12 text-center animate-in fade-in duration-500 scale-in-95">
            <div className="size-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-5xl text-green-500">check_circle</span>
            </div>
            <p className="text-xl font-bold text-white">¡Mensaje enviado!</p>
            <p className="text-text-muted mt-2">César se pondrá en contacto pronto.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] ml-1">Correo</label>
              <input
                required
                type="email"
                className="w-full bg-background-dark/50 border border-border-dark rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all placeholder:text-text-muted/30"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] ml-1">Mensaje</label>
              <textarea
                required
                rows={4}
                className="w-full bg-background-dark/50 border border-border-dark rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none transition-all resize-none placeholder:text-text-muted/30"
                placeholder="¿En qué podemos ayudarte?"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 w-full bg-primary hover:bg-blue-600 py-4 rounded-xl font-bold tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              {status === 'sending' ? (
                <>
                  <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Enviar Mensaje</span>
                  <span className="material-symbols-outlined text-lg">send</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
