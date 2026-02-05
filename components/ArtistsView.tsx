import React, { useState } from 'react';
import { ALL_ARTISTS, ARTIST_BIOS, ARTIST_IMAGES, ART_PIECES } from '../constants';
import { Artist, LightboxContent, ArtPiece } from '../types';
import { X, ArrowRight } from 'lucide-react';
import Button from './Button';

// Sort alphabetically if not already
const SORTED_ARTISTS = [...ALL_ARTISTS].sort((a, b) => a.localeCompare(b));

interface ArtistsViewProps {
  onImageClick: (content: LightboxContent, contextPiece?: ArtPiece) => void;
  onViewArtistWorks: (artist: Artist) => void;
}

const ArtistsView: React.FC<ArtistsViewProps> = ({ onImageClick, onViewArtistWorks }) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const getArtistImage = (artist: Artist): string | undefined => {
    // Check explicit images first (casting as Record to handle partial enum keys safely)
    const images = ARTIST_IMAGES as Record<string, string>;
    if (images[artist]) return images[artist];
    
    // Fallback to first art piece
    const piece = ART_PIECES.find(p => p.artist === artist);
    return piece?.url;
  };

  return (
    <div className="max-w-3xl mx-auto min-h-[60vh] flex flex-col justify-center animate-in fade-in duration-700">
      
      <div className="space-y-8 md:space-y-12 text-center md:text-left">
        {SORTED_ARTISTS.map((artist) => (
          <div key={artist} className="group relative">
            <h2 
              onClick={() => setSelectedArtist(artist)}
              className="font-serif text-4xl md:text-6xl text-gallery-900 cursor-pointer hover:text-gray-600 transition-colors duration-300 inline-block relative"
            >
              {artist}
              {/* Subtle underline on hover */}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-[#86CEB3] transition-all duration-500 group-hover:w-full opacity-100"></span>
            </h2>
          </div>
        ))}
      </div>

      {/* Bio Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gallery-50/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedArtist(null)}
          ></div>
          
          <div className="relative bg-white w-full max-w-xl p-8 md:p-12 shadow-2xl border border-gallery-200 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedArtist(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gallery-900 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              {/* Artist Image / Avatar */}
              {(() => {
                const imgUrl = getArtistImage(selectedArtist);
                if (imgUrl) {
                  return (
                    <div 
                      className="mb-8 flex justify-center"
                    >
                      <div 
                        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg cursor-pointer group"
                        onClick={() => {
                          const piece = ART_PIECES.find(p => p.artist === selectedArtist);
                          onImageClick({
                            url: imgUrl,
                            title: selectedArtist,
                            description: ARTIST_BIOS[selectedArtist],
                            subtitle: "Artist Profile"
                          }, piece);
                        }}
                      >
                         <img src={imgUrl} alt={selectedArtist} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              <h3 className="font-serif text-3xl md:text-4xl mb-6 text-gallery-900">{selectedArtist}</h3>
              <div className="w-12 h-px bg-gray-300 mx-auto mb-8"></div>
              <p className="font-serif text-xl leading-relaxed text-gray-600 mb-8">
                {ARTIST_BIOS[selectedArtist]}
              </p>
              
              <div className="flex justify-center">
                 <Button 
                   onClick={() => {
                     onViewArtistWorks(selectedArtist);
                     setSelectedArtist(null);
                   }}
                   className="flex items-center gap-2"
                 >
                   View Works <ArrowRight size={16} />
                 </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistsView;