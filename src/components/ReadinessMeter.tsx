import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ReadinessMeterProps {
  score: number; // 0-100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ReadinessMeter({ score, label = 'Readiness Score', size = 'lg' }: ReadinessMeterProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const sizeConfig = {
    sm: { radius: 60, strokeWidth: 8, fontSize: 'text-2xl' },
    md: { radius: 80, strokeWidth: 10, fontSize: 'text-3xl' },
    lg: { radius: 120, strokeWidth: 12, fontSize: 'text-5xl' },
  };

  const { radius, strokeWidth, fontSize } = sizeConfig[size];
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#00d4ff'; // blue
    if (score >= 40) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const color = getScoreColor(animatedScore);
  const scoreLabel = getScoreLabel(animatedScore);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: radius * 2 + 40, height: radius * 2 + 40 }}>
        {/* Background glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 0.9, 0.35, 1] }}
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ backgroundColor: color }}
        />

        {/* SVG Meter */}
        <svg
          className="transform -rotate-90"
          width={radius * 2 + 40}
          height={radius * 2 + 40}
        >
          {/* Background circle */}
          <circle
            cx={radius + 20}
            cy={radius + 20}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress circle */}
          <motion.circle
            cx={radius + 20}
            cy={radius + 20}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.22, 0.9, 0.35, 1] }}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />

          {/* Animated dots on the circle */}
          {[0, 90, 180, 270].map((angle, i) => {
            const x = radius + 20 + radius * Math.cos((angle * Math.PI) / 180);
            const y = radius + 20 + radius * Math.sin((angle * Math.PI) / 180);
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={3}
                fill={color}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 0.9, 0.35, 1] }}
            className={`${fontSize} font-bold`}
            style={{ color }}
          >
            {animatedScore}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm text-slate-400 mt-1"
          >
            out of 100
          </motion.div>
        </div>
      </div>

      {/* Label and status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 text-center"
      >
        <h3 className="text-xl font-semibold text-white mb-1">{label}</h3>
        <div className="flex items-center justify-center space-x-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-medium" style={{ color }}>
            {scoreLabel}
          </span>
        </div>
      </motion.div>

      {/* Breakdown bars */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-6 w-full max-w-xs space-y-3"
      >
        {[
          { label: 'Technical Skills', value: Math.min(score + 5, 100) },
          { label: 'Soft Skills', value: Math.max(score - 10, 0) },
          { label: 'Domain Knowledge', value: score },
        ].map((item, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: [0.22, 0.9, 0.35, 1] }}
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
