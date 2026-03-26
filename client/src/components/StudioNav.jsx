import React from 'react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/studio/try-on', label: 'Try-On' },
  { to: '/studio/customizer', label: 'Customizer' },
  { to: '/studio/zoom', label: 'Zoom' },
  { to: '/studio/quiz', label: 'Quiz' },
  { to: '/studio/room', label: 'Room' },
  { to: '/studio/moodboard', label: 'Moodboard' },
  { to: '/studio/ar', label: 'AR' },
];

export default function StudioNav() {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 bg-white p-2 border border-brand-gold/20">
        {items.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({ isActive }) =>
              `px-4 py-2 text-sm uppercase tracking-wide ${
                isActive ? 'bg-brand-gold text-white' : 'bg-brand-cream text-brand-dark hover:bg-white'
              }`
            }
          >
            {i.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
