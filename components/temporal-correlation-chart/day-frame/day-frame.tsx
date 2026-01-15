'use client';

interface DayFrameProps {
  selectedRange: number;
  num: number;
}

export const DayFrame = ({ selectedRange, num }: DayFrameProps) => {
  return (
    <div className="flex-1 h-full bg-purple-50/40 overflow-hidden border-b border-r last:border-r-0">
      <p>{num}</p>
    </div>
  );
};
