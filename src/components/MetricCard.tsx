import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  delay?: number;
}

export default function MetricCard({
  title,
  value,
  change,
  icon = '📊',
  trend = 'neutral',
  color = 'from-neon-blue to-primary-500',
  delay = 0,
}: MetricCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.]/g, ''));

  useEffect(() => {
    if (typeof value === 'number') {
      const duration = 1000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setAnimatedValue(numericValue);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, numericValue]);

  const displayValue = typeof value === 'number' ? animatedValue.toLocaleString() : value;

  const getTrendColor = () => {
    if (trend === 'up') return 'text-neon-green';
    if (trend === 'down') return 'text-red-400';
    return 'text-slate-400';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.9, 0.35, 1] }}
      className="card-3d relative overflow-hidden group"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl`}>
            {icon}
          </div>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              <span className="text-lg font-bold">{getTrendIcon()}</span>
              <span className="text-sm font-semibold">{Math.abs(change)}%</span>
            </div>
          )}
        </div>

        <h3 className="text-sm font-medium text-slate-400 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white count-up">{displayValue}</p>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 shimmer" />
      </div>
    </motion.div>
  );
}
