import { useState } from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  id: string;
  title: string;
  duration: string;
  badge: string;
  tasks: number;
  completionRate: number;
  category: string;
  description: string;
}

export default function SkillCard({
  title,
  duration,
  badge,
  tasks,
  completionRate,
  category,
  description,
}: SkillCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'soft-skills':
        return 'from-purple-500 to-pink-500';
      case 'technical':
        return 'from-blue-500 to-cyan-500';
      case 'career-prep':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  return (
    <div className="perspective-1000 h-80">
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.9, 0.35, 1] }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden">
          <div className="glass rounded-2xl p-6 h-full flex flex-col hover:shadow-glass transition-shadow duration-300">
            {/* Category badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-slate-300 uppercase tracking-wide">
                {category.replace('-', ' ')}
              </span>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(category)} flex items-center justify-center`}>
                <span className="text-xl">
                  {category === 'soft-skills' ? '💬' : category === 'technical' ? '💻' : '📋'}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-grow">
              {description}
            </p>

            {/* Stats */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Duration</span>
                <span className="text-white font-medium">{duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Tasks</span>
                <span className="text-white font-medium">{tasks} assignments</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Completion Rate</span>
                <span className="text-neon-green font-medium">{completionRate}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1, ease: [0.22, 0.9, 0.35, 1] }}
                  className={`h-full bg-gradient-to-r ${getCategoryColor(category)}`}
                />
              </div>
            </div>

            {/* Badge */}
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-lg">🏆</span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-400">Earn Badge</div>
                <div className="text-sm font-semibold text-white">{badge}</div>
              </div>
            </div>

            {/* CTA */}
            <button
              className="mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r from-neon-blue to-primary-500 hover:shadow-neon-hover transition-all duration-200 font-semibold text-sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
            >
              Start Course • {duration} • Badge
            </button>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="glass rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Assignment & Evidence</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Assignment details */}
            <div className="flex-grow space-y-4 overflow-y-auto">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Current Assignment</h4>
                <p className="text-sm text-slate-400">
                  Complete the {title.toLowerCase()} module and submit your work for review.
                </p>
              </div>

              {/* Tasks checklist */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Tasks ({tasks})</h4>
                <div className="space-y-2">
                  {Array.from({ length: Math.min(tasks, 4) }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        i < 2 ? 'border-neon-green bg-neon-green/20' : 'border-white/20'
                      }`}>
                        {i < 2 && (
                          <svg className="w-3 h-3 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm ${i < 2 ? 'text-slate-300 line-through' : 'text-slate-400'}`}>
                        Task {i + 1}: Complete module section
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence upload */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Upload Evidence</h4>
                <label className="block">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:border-neon-blue/50 hover:bg-white/5 transition-all">
                    {uploadedFile ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-slate-300">{uploadedFile}</span>
                      </div>
                    ) : (
                      <>
                        <svg className="w-8 h-8 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-xs text-slate-400">Click to upload or drag & drop</p>
                        <p className="text-xs text-slate-500 mt-1">PDF, DOC, or ZIP (max 10MB)</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <button
              className="mt-4 w-full py-2.5 rounded-lg bg-gradient-to-r from-neon-green to-green-500 hover:shadow-neon-hover transition-all duration-200 font-semibold text-sm"
              onClick={(e) => {
                e.stopPropagation();
                alert('Assignment submitted for review!');
              }}
            >
              Submit for Review
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
