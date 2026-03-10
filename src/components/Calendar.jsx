import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ onDateSelect, selectedDate }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const renderDays = () => {
        const totalDays = daysInMonth(currentMonth);
        const startDay = startDayOfMonth(currentMonth);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-12 w-full"></div>);
        }

        // Actual days
        for (let d = 1; d <= totalDays; d++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
            const isToday = new Date().toDateString() === date.toDateString();
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isPast = date < new Date().setHours(0, 0, 0, 0);

            days.push(
                <button
                    key={d}
                    disabled={isPast}
                    onClick={() => onDateSelect(date)}
                    className={`h-12 w-full flex items-center justify-center rounded-lg text-sm transition-all
            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-nova-gold/20 text-nova-navy'}
            ${isSelected ? 'bg-nova-gold font-bold shadow-md hover:bg-nova-gold' : ''}
            ${isToday && !isSelected ? 'border border-nova-gold text-nova-gold font-bold' : ''}
          `}
                >
                    {d}
                </button>
            );
        }

        return days;
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-nova-navy">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>
                <div className="flex gap-2">
                    <button
                        onClick={prevMonth}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                    <div key={day} className="h-8 flex items-center justify-center text-xs font-semibold text-nova-gray-400 uppercase">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {renderDays()}
            </div>
        </div>
    );
};

export default Calendar;
