import React from 'react';

const AboutView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      <div className="text-center mb-16">
        <h2 className="font-serif text-5xl md:text-6xl text-gallery-900 mb-6">About Us</h2>
        <div className="w-16 h-px bg-gallery-900 mx-auto opacity-30"></div>
      </div>
      
      <div className="space-y-12 text-gray-600 leading-relaxed font-serif text-lg">
        
        {/* Intro */}
        <section>
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left text-gallery-900">
            The Eight Space is a platform for rethinking how art is displayed and experienced. Located at 50 Elm Street in New Haven, Connecticut, we transform exhibition-making itself into a creative practice attending to display structures, spatial decisions, and the conditions under which art comes to life.
          </p>
        </section>

        {/* What We Believe */}
        <section>
          <h3 className="font-serif text-2xl mb-6 text-gallery-900 italic">What We Believe</h3>
          <p className="mb-6">
            <strong className="font-medium text-gallery-900">Exhibition-making is an art form in itself.</strong>
          </p>
          <p className="mb-6">
            While studios are where experimentation happens within artistic production, and residencies allow exploration through process and duration, most galleries simply present finished experimental works.
          </p>
          <p className="mb-6">
            The Eight Space focuses on experimentation in presentation itself.
          </p>
          <p>
            We hold multiple perspectives at once. We move past linear ideas of space and time. We connect different disciplines, practices, and communities. We expand beyond traditional gallery models because the way we encounter art shapes what art can become.
          </p>
        </section>

        {/* Our Approach */}
        <section>
          <h3 className="font-serif text-2xl mb-6 text-gallery-900 italic">Our Approach</h3>
          <p className="mb-6">
            Nestled within Mitchell Studio at 50 Elm Street, The Eight Space exists alongside active artistic practice. This embedded model creates flexibility, immediacy, and ongoing conversation between production and presentation.
          </p>
          <p className="mb-6">
            We curate both exhibitions and the act of curating itself, treating spatial decisions and presentation strategies as central materials. Every show is an opportunity to question: How does space shape meaning? What happens when duration becomes part of the work? How can exhibition structures themselves become acts of creative thinking?
          </p>
          <p>
            We support site-responsive installations, time-based and evolving exhibitions, participatory formats, minimal or altered display strategies, and cross-disciplinary presentations involving performance, sound, text, and architecture.
          </p>
        </section>

        {/* Our Place in New Haven */}
        <section className="bg-white p-8 md:p-10 border border-gallery-200 shadow-sm rounded-sm">
          <h3 className="font-serif text-2xl mb-6 text-gallery-900 italic">Our Place in New Haven</h3>
          <p className="mb-6">
            New Haven provides a unique environment for this work shaped by Yale University's intellectual culture, a dense network of cultural institutions, and an intimate scale that supports genuine local engagement.
          </p>
          <p className="mb-6">
            The Eight Space works as a connecting point: between academic discourse and independent practice, between experimental art and public access, between established institutions and emerging voices.
          </p>
          <p className="font-medium text-gallery-900">
            We're here because New Haven needed a venue devoted entirely to alternative exhibition formats. A place where the question isn't just what to show, but how showing happens at all.
          </p>
        </section>

      </div>
    </div>
  );
};

export default AboutView;