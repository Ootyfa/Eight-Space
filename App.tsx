import React, { useState, useEffect } from 'react';
import { ArtPiece, Artist, LightboxContent } from './types';
import { LOGO_URL, ARTIST_EXHIBITION_MAP } from './constants';
import Lightbox from './components/Lightbox';
import ExhibitionView from './components/ExhibitionView';
import ArtistsView from './components/ArtistsView';
import AboutView from './components/AboutView';
import VisitView from './components/VisitView';
import { Menu, X } from 'lucide-react';

type Page = 'Exhibition' | 'Artists' | 'About' | 'Visit';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Exhibition');
  
  // State for the Lightbox (visual)
  const [lightboxContent, setLightboxContent] = useState<LightboxContent | null>(null);
  
  // State for navigation context (deep linking from Artist view to Exhibition view)
  const [initialExhibitionContext, setInitialExhibitionContext] = useState<{
    exhibition: string;
    artist: Artist;
  } | null>(null);

  // Key to force re-render of ExhibitionView when resetting to "Home"
  const [exhibitionKey, setExhibitionKey] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: Page[] = ['Exhibition', 'Artists', 'About', 'Visit'];

  const handleNavClick = (page: Page) => {
    if (page === 'Exhibition') {
      // Force a reset of the exhibition view (back to posters)
      setExhibitionKey(prev => prev + 1);
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Clear context when manually navigating
    setInitialExhibitionContext(null);
  };

  const handleOpenLightbox = (content: LightboxContent, contextPiece?: ArtPiece) => {
    setLightboxContent(content);
  };

  const handleViewArtistWorks = (artist: Artist) => {
    const exhibition = ARTIST_EXHIBITION_MAP[artist];
    if (exhibition) {
      // Force a fresh mount to ensure context is picked up cleanly
      setExhibitionKey(prev => prev + 1);
      setInitialExhibitionContext({ exhibition, artist });
      setCurrentPage('Exhibition');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gallery-50 text-gallery-900 font-sans flex flex-col">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white/80 backdrop-blur-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('Exhibition')}>
             <img src={LOGO_URL} alt="Eight Space Logo" className="h-16 w-auto object-contain" />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 text-sm font-medium tracking-widest uppercase">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`transition-all duration-300 relative group py-2 ${currentPage === item ? 'text-gallery-900' : 'text-gray-400 hover:text-gallery-900'}`}
              >
                {item}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#86CEB3] transform origin-left transition-transform duration-300 ${currentPage === item ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden z-50 text-gallery-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
             {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
           {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-2xl font-medium tracking-widest uppercase ${currentPage === item ? 'text-gallery-900 border-b-2 border-[#86CEB3]' : 'text-gray-500'}`}
              >
                {item}
              </button>
            ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {currentPage === 'Exhibition' && (
          <>
            <div className="text-center mb-12 animate-in slide-in-from-bottom-5 duration-700">
               <h1 className="font-serif text-5xl md:text-7xl mb-6 text-gallery-900">Current Exhibition</h1>
               <p className="text-gray-500 max-w-xl mx-auto text-lg font-light">
                 A dialogue between texture, light, and the digital frontier.
               </p>
            </div>
            <ExhibitionView 
              key={exhibitionKey}
              onSelectPiece={handleOpenLightbox} 
              initialContext={initialExhibitionContext}
            />
          </>
        )}
        
        {currentPage === 'Artists' && (
          <ArtistsView 
            onImageClick={handleOpenLightbox} 
            onViewArtistWorks={handleViewArtistWorks}
          />
        )}
        
        {currentPage === 'About' && <AboutView />}
        
        {currentPage === 'Visit' && <VisitView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>&copy; {new Date().getFullYear()} Eight Space. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-2 font-medium">
             <span>Made with ❤️ by a artnxt company</span>
          </div>
        </div>
      </footer>

      {/* Interactive Elements */}
      <Lightbox 
        content={lightboxContent} 
        onClose={() => setLightboxContent(null)} 
      />

    </div>
  );
};

export default App;