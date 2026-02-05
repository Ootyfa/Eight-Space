import React from 'react';
import { MapPin, Clock } from 'lucide-react';

const VisitView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
       <div className="grid md:grid-cols-2 gap-12 items-start">
         
         <div className="bg-white p-10 md:p-14 rounded-sm shadow-sm border border-gallery-200">
            <h2 className="font-serif text-3xl md:text-4xl mb-8 text-gallery-900">Plan Your Visit</h2>
            
            <div className="space-y-10">
              <div className="flex gap-4 items-start">
                <Clock className="shrink-0 mt-1 text-gallery-800" size={20} />
                <div>
                  <h3 className="font-sans font-medium uppercase tracking-widest text-xs mb-2 text-gallery-800">Opening Hours</h3>
                  <p className="text-gray-600 font-serif text-lg">By appointment during the exhibition period.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <MapPin className="shrink-0 mt-1 text-gallery-800" size={20} />
                <div>
                  <h3 className="font-sans font-medium uppercase tracking-widest text-xs mb-2 text-gallery-800">Location</h3>
                  <p className="text-gray-600 font-serif text-lg leading-relaxed">
                    The Eight Space<br/>
                    50 Elm Street<br/>
                    New Haven, Connecticut
                  </p>
                </div>
              </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="h-80 w-full bg-gallery-200 rounded-sm overflow-hidden relative border border-gallery-200">
               {/* Map pointing to New Haven, CT */}
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.0772776858273!2d-72.92906368457597!3d41.3082139792716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7d9b68a86777f%3A0x4a47738222a728b6!2s50%20Elm%20St%2C%20New%20Haven%2C%20CT%2006510!5e0!3m2!1sen!2sus!4v1676648021876!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              ></iframe>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-gallery-900 mb-4">Accessibility</h3>
              <p className="text-gray-600 leading-relaxed font-serif text-lg">
                The Eight Space is committed to ensuring that our exhibitions are accessible to all visitors. 
                Our physical space is wheelchair accessible.
              </p>
            </div>
         </div>

       </div>
    </div>
  );
};

export default VisitView;