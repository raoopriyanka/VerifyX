import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, Box, Truck, Store, QrCode, AlertTriangle, Loader2 } from 'lucide-react';
import API from '../../services/api';

export default function ProductTimeline({ productId, events: externalEvents }) {
  const [events, setEvents] = useState(externalEvents || []);
  const [isLoading, setIsLoading] = useState(!externalEvents && !!productId);
  const [error, setError] = useState('');

  useEffect(() => {
    // If external events are passed directly, use them
    if (externalEvents) {
      setEvents(externalEvents);
      setIsLoading(false);
      return;
    }

    // Otherwise, fetch live from backend if productId is present
    const fetchTimeline = async () => {
      try {
        setIsLoading(true);
        const response = await API.get(`/supply-chain/${productId}`);
        // Map backend event data structure to component format
        const fetchedEvents = response.data.data.events.map((e, index, arr) => ({
          type: e.eventType.toLowerCase(),
          title: e.eventType,
          description: e.notes || `Product status updated to ${e.eventType}`,
          date: new Date(e.timestamp).toLocaleString(),
          status: index === arr.length - 1 ? 'current' : 'completed',
          txHash: e.transactionHash || null,
          location: e.location,
          role: e.fromRole
        }));
        setEvents(fetchedEvents);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load tracking history.');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchTimeline();
    }
  }, [productId, externalEvents]);

  const getEventIcon = (type) => {
    switch (type) {
      case 'registered':
      case 'manufactured': return <Box className="w-4 h-4" />;
      case 'dispatched':
      case 'in_transit':
      case 'transit': return <Truck className="w-4 h-4" />;
      case 'received': return <Store className="w-4 h-4" />;
      case 'sold': return <QrCode className="w-4 h-4" />;
      case 'flagged': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-red-500 py-4">{error}</div>;
  }

  if (!events || events.length === 0) {
    return <div className="text-sm text-slate-500 py-4">No tracking history available.</div>;
  }

  return (
    <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
      {events.map((event, index) => {
        const isCompleted = event.status === 'completed';
        const isCurrent = event.status === 'current';
        
        return (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline Icon Marker */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10 transition-colors ${
              event.type === 'flagged' ? 'bg-red-500 text-white' :
              isCompleted ? 'bg-emerald-500 text-white' : 
              isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 
              'bg-slate-100 text-slate-400'
            }`}>
              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : getEventIcon(event.type)}
            </div>
            
            {/* Event Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                  {event.title}
                </h4>
                <time className="text-[10px] font-mono font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                  {event.date || 'Pending'}
                </time>
              </div>
              <p className="text-xs text-slate-600 mb-2">{event.description}</p>
              
              {event.location && (
                <div className="text-[11px] text-slate-500 mb-2">
                  <span className="font-semibold text-slate-700">Location:</span> {event.location}
                </div>
              )}

              {/* Ledger / Blockchain Tx Reference */}
              {event.txHash ? (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Ledger Hash:</span>
                  <span className="text-xs font-mono text-blue-600 truncate">{event.txHash}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">Ledger Status:</span>
                  <span className="text-[11px] text-amber-600 font-medium">Recorded Locally (Phase 2)</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}