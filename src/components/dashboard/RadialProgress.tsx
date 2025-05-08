import React from 'react';
import { cn } from '../../utils/cn';

interface RadialProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  label?: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

const RadialProgress: React.FC<RadialProgressProps> = ({
  value,
  max,
  size = 120,
  strokeWidth = 10,
  color = '#8b5cf6',
  bgColor = '#e5e7eb',
  label,
  prefix = '',
  suffix = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), max); // Clamp value between 0 and max
  const progressPercent = (progress / max) * 100;
  const dashOffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={bgColor}
          fill="none"
          className="opacity-20"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label ? (
          label
        ) : (
          <>
            <span className="text-2xl font-bold">
              {prefix}{Math.round(progressPercent)}{suffix}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              of {max}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default RadialProgress;
