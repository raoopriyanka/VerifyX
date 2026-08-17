import React from 'react';
import { CheckCircle2, Clock, Box, Truck, Store, QrCode } from 'lucide-react';

export default function ProductTimeline({ events = [] }) {
  if (!events || events.length === 0) {
    return <div className="text-sm text-slate-500 py-4">No tracking history available.</div>;
  }

  const getEventIcon = (type) => {
    switch (type) {
      case 'manufactured': return <Box className="w-4 h-4" />;
      case 'transit': return <Truck className="w-4 h-4" />;
      case 'received': return <Store className="w-4 h-4" />;
      case 'sold': return <QrCode className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
      {events.map((event, index) => {
        const isCompleted = event.status === 'completed';
        const isCurrent = event.status === 'current';
        
        return (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline Icon Marker */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10 transition-colors ${
              isCompleted ? 'bg-emerald-500 text-white' : 
              isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 
              'bg-slate-100 text-slate-400'
            }`}>
              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : getEventIcon(event.type)}
            </div>
            
            {/* Event Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className={`font-bold text-sm ${isCompleted || isCurrent ? 'text-slate-900' : 'text-slate-500'}`}>
                  {event.title}
                </h4>
                <time className="text-[10px] font-mono font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                  {event.date || 'Pending'}
                </time>
              </div>
              <p className="text-xs text-slate-500 mb-3">{event.description}</p>
              
              {/* Blockchain Tx Reference (if completed) */}
              {event.txHash && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Ledger Hash:</span>
                  <span className="text-xs font-mono text-blue-600 truncate">{event.txHash}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}