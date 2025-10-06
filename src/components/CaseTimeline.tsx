import { motion } from 'framer-motion';

interface CaseEvent {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface CaseTimelineProps {
  caseId: string;
  severity: 'RED' | 'ORANGE' | 'GREEN';
  events: CaseEvent[];
  onAccept?: () => void;
  onReassign?: () => void;
  onEscalate?: () => void;
  onExport?: () => void;
}

export default function CaseTimeline({
  caseId,
  severity,
  events,
  onAccept,
  onReassign,
  onEscalate,
  onExport,
}: CaseTimelineProps) {
  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'RED':
        return 'from-red-500 to-red-600';
      case 'ORANGE':
        return 'from-orange-500 to-orange-600';
      case 'GREEN':
        return 'from-green-500 to-green-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'in_progress':
        return (
          <svg className="w-5 h-5 text-neon-blue animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Case Details</h3>
          <p className="text-sm text-slate-400">ID: {caseId}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${getSeverityColor(severity)} text-white font-semibold text-sm`}>
          {severity}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4 mb-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-4"
          >
            {/* Status icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              {getStatusIcon(event.status)}
            </div>

            {/* Content */}
            <div className="flex-1 pb-4 border-b border-white/10 last:border-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-sm font-semibold text-white">{event.action}</h4>
                <span className="text-xs text-slate-500">{event.timestamp}</span>
              </div>
              <p className="text-sm text-slate-400">By {event.actor}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onAccept}
          className="px-4 py-2.5 rounded-lg bg-neon-green/20 border border-neon-green/50 text-neon-green hover:bg-neon-green/30 transition-colors text-sm font-semibold"
        >
          Accept Case
        </button>
        <button
          onClick={onReassign}
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-colors text-sm font-semibold"
        >
          Reassign
        </button>
        <button
          onClick={onEscalate}
          className="px-4 py-2.5 rounded-lg bg-orange-500/20 border border-orange-500/50 text-orange-300 hover:bg-orange-500/30 transition-colors text-sm font-semibold"
        >
          Escalate
        </button>
        <button
          onClick={onExport}
          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 transition-colors text-sm font-semibold"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
