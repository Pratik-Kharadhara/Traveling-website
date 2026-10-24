import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, MapPin } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: 'Landscapes' | 'Heritage' | 'Stays' | 'Coastal';
  image: string;
  description: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Torii Gates at Dawn',
    location: 'Kyoto, Japan',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'Vermilion gates stretching up the mountain path in quiet morning mist.'
  },
  {
    id: 'g-2',
    title: 'Cliffside Terraces of Positano',
    location: 'Amalfi Coast, Italy',
    category: 'Coastal',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    description: 'Pastel architecture tumbling down towards the crystalline Tyrrhenian Sea.'
  },
  {
    id: 'g-3',
    title: 'Matterhorn Alpine Majesty',
    location: 'Zermatt, Switzerland',
    category: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden hour reflection over the iconic alpine peak.'
  },
  {
    id: 'g-4',
    title: 'Caldera Sunset Suite',
    location: 'Oia, Santorini',
    category: 'Stays',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    description: 'Private infinity plunge pool overlooking volcanic sea panoramas.'
  },
  {
    id: 'g-5',
    title: 'Serengeti Hot Air Balloon',
    location: 'Serengeti, Tanzania',
    category: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    description: 'Gliding silently over boundless savannah grasslands and migrating herds.'
  },
  {
    id: 'g-6',
    title: 'Ubud Jungle Sanctuary',
    location: 'Bali, Indonesia',
    category: 'Stays',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Emerald treehouse terrace suspended above the mist-laden valley.'
  }
];

export const PhotoGallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = ['All', 'Landscapes', 'Heritage', 'Stays', 'Coastal'];

  const filteredPhotos = galleryData.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(activePhotoIndex === 0 ? filteredPhotos.length - 1 : activePhotoIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(activePhotoIndex === filteredPhotos.length - 1 ? 0 : activePhotoIndex + 1);
    }
  };

  return (
    <section id="gallery" style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '45px' }}>
        <span className="badge-gold">
          <Camera size={13} />
          <span>Visual Odyssey</span>
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '12px', marginBottom: '14px' }}>
          Captures from the Edge of Elegance
        </h2>
        <p style={{ maxWidth: '620px', margin: '0 auto' }}>
          A visual archive of sacred dawn moments, private coves, and unforgettable architectural wonders.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '35px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              border: selectedCategory === cat ? '1px solid var(--accent-gold)' : '1px solid var(--border-light)',
              background: selectedCategory === cat ? 'var(--accent-gold-subtle)' : 'var(--surface)',
              color: selectedCategory === cat ? 'var(--accent-gold-hover)' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: selectedCategory === cat ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setActivePhotoIndex(index)}
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              height: '320px',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-light)'
            }}
            className="gallery-item-card"
          >
            <img
              src={photo.image}
              alt={photo.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />

            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(30, 25, 20, 0.85) 0%, rgba(30, 25, 20, 0) 50%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '20px',
              color: '#FFFFFF'
            }}>
              <span className="badge-gold" style={{ alignSelf: 'flex-start', marginBottom: '8px', background: 'rgba(255, 255, 255, 0.25)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}>
                {photo.category}
              </span>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '4px' }}>{photo.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', opacity: 0.9 }}>
                <MapPin size={13} color="var(--accent-gold)" />
                <span>{photo.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="modal-overlay"
          onClick={() => setActivePhotoIndex(null)}
          style={{ background: 'rgba(20, 18, 16, 0.95)' }}
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <X size={22} />
          </button>

          {/* Prev / Next controls */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Lightbox Content Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              width: '100%',
              textAlign: 'center',
              padding: '20px'
            }}
          >
            <img
              src={filteredPhotos[activePhotoIndex].image}
              alt={filteredPhotos[activePhotoIndex].title}
              style={{
                maxHeight: '68vh',
                maxWidth: '100%',
                borderRadius: 'var(--radius-md)',
                objectFit: 'contain',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            />

            <div style={{ marginTop: '16px', color: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '6px' }}>
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 8px' }}>
                {filteredPhotos[activePhotoIndex].description}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--accent-gold)' }}>
                <MapPin size={14} />
                <span>{filteredPhotos[activePhotoIndex].location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
