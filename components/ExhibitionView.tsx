import React, { useState, useEffect } from 'react';
import { ArtPiece, Artist, LightboxContent } from '../types';
import { ART_PIECES, ALL_ARTISTS, EXHIBITION_POSTERS, ARTIST_BIOS } from '../constants';
import { Search, ChevronLeft } from 'lucide-react';

interface ExhibitionViewProps {
  onSelectPiece: (content: LightboxContent, artPiece?: ArtPiece) => void;
  initialContext?: { exhibition: string; artist: Artist } | null;
}

const ExhibitionView: React.FC<ExhibitionViewProps> = ({ onSelectPiece, initialContext }) => {
  const [viewMode, setViewMode] = useState<'posters' | 'gallery'>('posters');
  const [activeExhibition, setActiveExhibition] = useState<string | null>(null);
  const [selectedArtistFilter, setSelectedArtistFilter] = useState<Artist | 'All'>('All');

  // React to initialContext changes to support deep linking from Artists page
  useEffect(() => {
    if (initialContext) {
      setActiveExhibition(initialContext.exhibition);
      setSelectedArtistFilter(initialContext.artist);
      setViewMode('gallery');
    }
  }, [initialContext]);

  const EXHIBITION_DATA: Record<string, { curator: string, artists: Artist[], description: React.ReactNode }> = {
    "The Line Starts From Where You Stand": {
      curator: "Curated by Madhavan Pillai",
      artists: [Artist.RODNEY_DICKSON, Artist.MARTIN_SECK, Artist.NAPOLES_MARTY],
      description: (
        <>
          <p>
            Because all seeing begins with a place to see from. Before the dots and the line and the form, before the image emerges, there is position. Where you stand determines what you see, how you see it, and what you perceive it to be. The artistic process begins with the body in place and the movement of the hand responding to what the eye perceives as truth.
          </p>
          <p>
            This relationship between position and perception, between standing and seeing, is the foundation of this exhibition. Three artists working across sculpture, painting, drawing, and video reveal that observation is never neutral. Napoles Marty carves and chars wood into sculptural figures, while his drawings trace the same mythic creatures on paper, both refusing to stay still between myth and matter.
          </p>
          <p>
            Rodney Dickson painted his 1985 portraits on bedsheets, curtains, and torn blankets because he had no money for canvas. That scarcity became a method. Martin Seck draws with what he calls "comely lines" that explode forms into fragments. Together, their works form a conversation about how position shapes vision.
          </p>
        </>
      )
    },
    "Mother Brown, Gold Fields, and Wild Honey": {
      curator: "Solo Exhibition",
      artists: [Artist.ANINDITA_DUTTA],
      description: (
        <>
          <p className="font-bold text-gallery-900 mb-4 italic">An Exhibition of Wet Clay Performance Work by Anindita Dutta</p>
          <p>
            In <em>Mother Brown, Gold Fields, and Wild Honey</em>, Anindita Dutta reshapes clay into a raw, tactile language of earth, body, and memory. Her sculptures and performances are not passive objects but charged rituals—gestures that awaken wet clay into a medium of emotional and cultural power. Through her hands, clay becomes a reflection of life's dualities: strength and fragility, nurture and power, joy and sorrow. Dutta does not resolve these tensions; she lets them breathe, creating forms alive with the urgency of human experience.
          </p>
          <p>
            Clay, for Dutta, is both a witness and co-creator. It holds the echoes of ancient practices—stories told through generations—and speaks directly to the present. Her sculptures, shaped from raw, undyed clay, carry the natural pigments of the land itself. The Indian red of India, the yellows of China, the red ochre of Japan, the reds and oranges of Mexico, and the diverse clays of America: these clays, in their myriad hues, anchor her work in the global language of earth.
          </p>
          <p>
            Dutta’s performances deepen this conversation between flesh and soil, body and earth. Staged in galleries, museums, and public spaces, these acts dissolve boundaries between humans and the earth. Bodies press into clay, leaving behind traces—these marks become a living record of endurance, resistance, and renewal. The clay pushes back, stiffening or crumbling, mirroring what Dutta calls its “stubborn kinship with bodies fighting to hold their shape.” Here, she asks: where does the self end and the world begin?
          </p>
          <p>
            The exhibition’s title—<em>Mother Brown, Gold Fields, Wild Honey</em>—anchors this interplay of intimacy and universality. “Mother Brown” evokes the generative earth, a primal caretaker; “Gold Fields” speaks to histories of labor and wealth, brutal and luminous; “Wild Honey” hums with the untamed sweetness of nature. Together, they map Dutta’s journey from personal memory to shared myth. Her abstracted forms draw inspiration from the tactile rituals of rural India yet resonate with ancient global traditions where clay binds communities to land and lineage.
          </p>
          <p>
            This exhibition invites you to witness clay’s silent alchemy. Dutta’s art does not describe change—it ignites it. In her hands, every groove becomes a story of survival, every dent a testament to defiance. Her work roars a quiet truth: like clay, we are marked by the pressures of living, yet within us burns the will to endure, to reshape, to rise.
          </p>
        </>
      )
    }
  };
  
  const handlePosterClick = (title: string, url: string) => {
    if (EXHIBITION_DATA[title]) {
      setActiveExhibition(title);
      setViewMode('gallery');
      setSelectedArtistFilter('All');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback for unknown exhibitions
      onSelectPiece({ url, hideInfo: true, title });
    }
  };

  const currentExhibitionData = activeExhibition ? EXHIBITION_DATA[activeExhibition] : null;

  // Filter pieces based on the ACTIVE EXHIBITION'S artists
  const exhibitionPieces = activeExhibition 
    ? ART_PIECES.filter(p => EXHIBITION_DATA[activeExhibition].artists.includes(p.artist))
    : [];

  // Further filter by selected artist toggle
  const filteredPieces = selectedArtistFilter === 'All' 
    ? exhibitionPieces 
    : exhibitionPieces.filter(p => p.artist === selectedArtistFilter);

  if (viewMode === 'posters') {
    return (
      <div className="animate-in fade-in duration-700 max-w-6xl mx-auto">
        {/* Main Current Exhibition - "The Line Starts..." */}
        <div className="mb-24 text-center">
          <div 
            className="cursor-pointer group relative inline-block bg-white p-2 md:p-4 shadow-xl"
            onClick={() => handlePosterClick(EXHIBITION_POSTERS[0].title, EXHIBITION_POSTERS[0].url)}
          >
             <img 
               src={EXHIBITION_POSTERS[0].url} 
               alt={EXHIBITION_POSTERS[0].title} 
               className="w-full max-w-2xl h-auto object-contain"
             />
             <div className="mt-4 text-left">
                <p className="text-xs font-sans tracking-widest uppercase text-gray-500 mb-1">Current Exhibition</p>
                <h3 className="font-serif text-2xl md:text-3xl text-gallery-900">
                  {EXHIBITION_POSTERS[0].title}
                </h3>
                <p className="text-sm text-gray-400 mt-2 font-serif italic">Click to view works</p>
             </div>
          </div>
        </div>

        {/* Other Exhibitions */}
        <div className="border-t border-gallery-200 pt-16">
          <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 mb-12 text-center">Other Exhibitions</h3>
          <div className="flex justify-center">
            {EXHIBITION_POSTERS.slice(1).map((poster, idx) => (
              <div 
                key={idx} 
                className="cursor-pointer group max-w-md"
                onClick={() => handlePosterClick(poster.title, poster.url)}
              >
                <div className="relative overflow-hidden bg-white p-1 shadow-sm group-hover:shadow-md transition-shadow">
                  <img 
                    src={poster.url} 
                    alt={poster.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <h4 className="font-serif text-lg mt-4 text-center text-gray-500 group-hover:text-gallery-900 transition-colors">
                  {poster.title}
                </h4>
                <p className="text-center text-xs uppercase tracking-widest text-gray-400 mt-1">View Collection</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Gallery View
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header / Back */}
      <div className="flex flex-col items-center mb-8">
        <button 
          onClick={() => setViewMode('posters')}
          className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gallery-900 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Exhibitions
        </button>
        <h2 className="font-serif text-4xl md:text-5xl text-center text-gallery-900 mb-3">{activeExhibition}</h2>
        <p className="font-sans text-sm tracking-widest uppercase text-gray-500">{currentExhibitionData?.curator}</p>
      </div>

      {/* Description */}
      {currentExhibitionData && (
        <div className="max-w-3xl mx-auto mb-16 space-y-6 text-gray-600 font-serif text-lg leading-relaxed text-justify md:text-left px-4">
          {currentExhibitionData.description}
        </div>
      )}

      {/* Gallery Filters - Only show if there are multiple artists */}
      {currentExhibitionData && currentExhibitionData.artists.length > 1 && (
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-6 md:gap-10 text-sm font-medium tracking-wide border-b border-gallery-200 pb-4 px-8">
            <button 
              onClick={() => setSelectedArtistFilter('All')}
              className={`transition-all duration-300 pb-1 ${selectedArtistFilter === 'All' ? 'text-gallery-900 border-b border-gallery-900' : 'text-gray-400 hover:text-gallery-900 border-b border-transparent'}`}
            >
              All Works
            </button>
            {currentExhibitionData.artists.map(artist => (
              <button
                key={artist}
                onClick={() => setSelectedArtistFilter(artist)}
                className={`transition-all duration-300 pb-1 ${selectedArtistFilter === artist ? 'text-gallery-900 border-b border-gallery-900' : 'text-gray-400 hover:text-gallery-900 border-b border-transparent'}`}
              >
                {artist}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filteredPieces.map((piece, idx) => (
          <div 
            key={piece.id}
            className="group cursor-pointer relative break-inside-avoid"
            onClick={() => onSelectPiece({
              url: piece.url,
              title: piece.title,
              subtitle: piece.artist,
              hideInfo: true // Hide info to show full image
            }, piece)}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="relative overflow-hidden bg-white aspect-[3/4] shadow-sm hover:shadow-xl transition-all duration-500 ease-out p-2 border border-gallery-100">
              <img 
                src={piece.url} 
                alt={piece.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="font-serif text-lg leading-tight text-gallery-900 truncate px-2">
                {piece.title}
              </h3>
              <p className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                {piece.artist}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredPieces.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-20" />
          <p>No works found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default ExhibitionView;