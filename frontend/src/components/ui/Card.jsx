import React from 'react';

export default function Card({ children, className = '', hoverEffect = false, ...props }) {
  return (
    <div
      className={`bg-white border border-slate-200/80 rounded-xl shadow-sm p-6 ${
        hoverEffect ? 'hover:shadow-md hover:border-slate-300 transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}