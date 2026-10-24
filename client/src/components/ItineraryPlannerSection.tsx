import React, { useState } from 'react';
import { ItineraryDayPlan } from '../types';
import { Calendar, Plus, Trash2, Clock, MapPin, DollarSign, Sparkles, Download, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ItineraryPlannerSection: React.FC = () => {
  const { showToast } = useAuth();
  const [destinationTitle, setDestinationTitle] = useState('Kyoto & Swiss Alpine Fusion Expedition');
  const [days, setDays] = useState<ItineraryDayPlan[]>([
    {
      id: 'day-1',
      dayNumber: 1,
      title: 'Sunrise Inari & Bamboo Whispers',
      activity: 'Private sunrise photography at Fushimi Inari shrines before crowds arrive, followed by matcha breakfast in Arashiyama.',
      timeSlot: 'Morning',
      location: 'Kyoto, Japan',
      estimatedCost: 320,
      notes: 'Private chauffeur and English-speaking shinto historian booked.'
    },
    {
      id: 'day-2',
      dayNumber: 2,
      title: 'Kaiseki Masterclass & Zen Meditation',
      activity: 'Four-hands cooking workshop with Michelin-starred chef in Gion, followed by twilight Zen garden contemplation.',
      timeSlot: 'Afternoon',
      location: 'Gion, Kyoto',
      estimatedCost: 450,
      notes: 'Special request: seasonal matsutake mushroom vegetarian course.'
    },
    {
      id: 'day-3',
      dayNumber: 3,
      title: 'Private Yacht Cruise to Faraglioni',
      activity: 'Charter a classic Riva Aquarama speedboat from Positano marina to the secluded sapphire grottos of Capri.',
      timeSlot: 'Morning',
      location: 'Capri, Italy',
      estimatedCost: 890,
      notes: 'Includes chilled Franciacorta and Mediterranean crudo tasting.'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newActivity, setNewActivity] = useState('');
  const [newSlot, setNewSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [newLocation, setNewLocation] = useState('');
  const [newCost, setNewCost] = useState(250);
  const [showAddForm, setShowAddForm] = useState(false);

  const totalEstimatedCost = days.reduce((sum, d) => sum + d.estimatedCost, 0);

  const handleAddDay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newActivity) {
      showToast('Please provide an activity title and description.', 'error');
      return;
    }

    const newDay: ItineraryDayPlan = {
      id: `day-${Date.now()}`,
      dayNumber: days.length + 1,
      title: newTitle,
      activity: newActivity,
      timeSlot: newSlot,
      location: newLocation || 'Custom Sanctuary',
      estimatedCost: Number(newCost) || 0,
      notes: 'Custom traveler itinerary note.'
    };

    setDays([...days, newDay]);
    setNewTitle('');
    setNewActivity('');
    setNewLocation('');
    setShowAddForm(false);
    showToast(`Day ${newDay.dayNumber} added to your custom itinerary!`, 'success');
  };

  const handleDeleteDay = (id: string) => {
    const updated = days.filter(d => d.id !== id).map((d, index) => ({
      ...d,
      dayNumber: index + 1
    }));
    setDays(updated);
    showToast('Itinerary day removed.', 'info');
  };

  const handleExport = () => {
    showToast('Itinerary saved to your travel profile & PDF summary exported!', 'success');
  };

  return (
    <section id="itinerary" style={{ padding: '80px 24px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <span className="badge-gold">
            <Sparkles size={13} />
            <span>Interactive Designer</span>
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '12px', marginBottom: '14px' }}>
            Interactive Bespoke Travel Itinerary Planner
          </h2>
          <p style={{ maxWidth: '620px', margin: '0 auto' }}>
            Customize your daily schedule, tailor morning excursions and sunset dining, and calculate live expedition budgets.
          </p>
        </div>

        {/* Itinerary Control Bar */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '30px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-light)', letterSpacing: '0.05em' }}>
              Itinerary Name
            </label>
            <input
              type="text"
              value={destinationTitle}
              onChange={(e) => setDestinationTitle(e.target.value)}
              className="input-aesthetic"
              style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, border: 'none', padding: '4px 0', background: 'transparent' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                Total Days
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {days.length} Days Planned
              </div>
            </div>

            <div style={{ width: '1px', height: '36px', background: 'var(--border-light)' }} />

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                Est. Daily Budget
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--accent-gold-hover)' }}>
                ${totalEstimatedCost.toLocaleString()}
              </div>
            </div>

            <button
              onClick={handleExport}
              className="btn-outline"
              style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            >
              <Download size={15} />
              <span>Save & Export</span>
            </button>
          </div>
        </div>

        {/* Timeline of Days */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '30px' }}>
          {days.map((day) => (
            <div
              key={day.id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                padding: '22px 26px',
                display: 'grid',
                gridTemplateColumns: '70px 1fr 140px 40px',
                gap: '20px',
                alignItems: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
              className="itinerary-row"
            >
              {/* Day badge */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--accent-gold-subtle)',
                border: '1.5px solid var(--accent-gold-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold-hover)'
              }}>
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DAY</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1 }}>0{day.dayNumber}</span>
              </div>

              {/* Day Details */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{day.title}</h3>
                  <span className="badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                    {day.timeSlot}
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{day.activity}</p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: 'var(--text-light)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} color="var(--accent-gold)" />
                    {day.location}
                  </span>
                  <span>• {day.notes}</span>
                </div>
              </div>

              {/* Estimated Day Cost */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Day Budget</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  ${day.estimatedCost.toLocaleString()}
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDeleteDay(day.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-light)',
                  padding: '6px'
                }}
                title="Remove Day"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Add Day Button or Form */}
        {!showAddForm ? (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-gold"
              style={{ padding: '10px 24px' }}
            >
              <Plus size={16} />
              <span>Add Custom Day / Activity</span>
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleAddDay}
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px dashed var(--accent-gold-border)',
              padding: '24px',
              animation: 'fadeIn 0.25s ease'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Add Itinerary Excursion (Day {days.length + 1})</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Excursion Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Helicopter Flight to Matterhorn"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input-aesthetic"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Time Slot
                </label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value as any)}
                  className="input-aesthetic"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Location / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zermatt, Switzerland"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="input-aesthetic"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Estimated Cost ($)
                </label>
                <input
                  type="number"
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="input-aesthetic"
                  min="0"
                />
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Activity Description & Details
              </label>
              <textarea
                placeholder="Describe the experience, transfers, dining, and highlights..."
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                className="input-aesthetic"
                rows={3}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-gold" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} />
                <span>Save Excursion</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-outline"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .itinerary-row {
            grid-template-columns: 1fr !important;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
};
