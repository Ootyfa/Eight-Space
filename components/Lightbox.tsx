import React from 'react';
import { LightboxContent } from '../types';
import { X } from 'lucide-react';

interface LightboxProps {
  content: LightboxContent | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ content, onClose }) => {
  if (!content) return null;

  // Only show info panel if hideInfo is false AND there is actual content to show.
  // We removed the default text string, so if description is empty, check other fields.
  const hasContent = content.title || content.subtitle || content.description;
  const showInfo = !content.hideInfo && hasContent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/95 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Content */}
      <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in-95 duration-300 ${showInfo ? 'md:flex-row max-w-6xl' : 'max-w-7xl'}`}>
        
        {/* Image Container */}
        <div className={`relative flex-1 h-full w-full flex items-center justify-center`}>
             <img 
            src={content.url} 
            alt={content.title || 'Artwork'}
            className="max-h-full max-w-full object-contain shadow-2xl rounded-sm"
          />
        </div>

        {/* Info Panel - Only shown if enabled and has content */}
        {showInfo && (
          <div className="w-full md:w-80 lg:w-96 bg-white p-6 md:p-8 shadow-xl border-l border-gray-100 flex flex-col justify-center shrink-0">
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-gallery-900 mb-2 italic">
                  {content.title}
                </h2>
                {content.subtitle && (
                  <p className="text-gray-500 font-sans tracking-widest text-sm uppercase">
                    {content.subtitle}
                  </p>
                )}
              </div>

              {content.description && (
                <>
                  <div className="h-px bg-gray-200 w-16" />
                  <div className="space-y-4 text-gray-600 text-sm leading-relaxed font-sans">
                    <p>{content.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:-top-4 md:-right-4 p-2 bg-white rounded-full shadow-lg hover:rotate-90 transition-all duration-300 text-gallery-900 z-50"
        >
          <X size={24} />
        </button>

      </div>
    </div>
  );
};

export default Lightbox;