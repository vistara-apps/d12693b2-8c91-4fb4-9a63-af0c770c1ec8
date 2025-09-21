'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

interface CalendarPickerProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  availableSlots?: string[];
  variant?: 'single' | 'range';
}

export function CalendarPicker({
  selectedDate,
  onDateSelect,
  availableSlots = [],
  variant = 'single'
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());

  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));

  const days = [];
  const day = new Date(startDate);

  while (day <= endDate) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  const isAvailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availableSlots.some(slot => slot.startsWith(dateStr));
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date) => {
    return date < today;
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="card max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={previousMonth}
          className="p-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <h3 className="text-lg font-semibold text-text-primary">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <Button
          variant="outline"
          size="sm"
          onClick={nextMonth}
          className="p-1"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const available = isAvailable(date);
          const selected = isSelected(date);
          const past = isPast(date);
          const today = isToday(date);

          return (
            <button
              key={index}
              onClick={() => !past && available && onDateSelect(date)}
              disabled={past || !available}
              className={cn(
                'h-10 w-10 text-sm font-medium rounded-lg transition-colors duration-200',
                'hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-accent-500',
                {
                  'text-text-primary': isCurrentMonth && !past,
                  'text-text-secondary/50': !isCurrentMonth || past,
                  'bg-primary text-white': selected,
                  'bg-accent/20 text-accent': available && !selected && !past,
                  'cursor-pointer': !past && available,
                  'cursor-not-allowed': past || !available,
                  'ring-2 ring-primary-500': today && !selected,
                }
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-accent/20 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}

