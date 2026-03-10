import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar as CalendarIcon,
    Clock,
    User,
    Mail,
    Phone,
    Globe,
    ChevronLeft,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ArrowRight
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Calendar from './Calendar';

const BookingManager = ({ onBack, initialServiceIds = [] }) => {
    const [step, setStep] = useState(1);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [existingBookings, setExistingBookings] = useState([]);
    const [fetchingSlots, setFetchingSlots] = useState(false);

    // Form State
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [clientInfo, setClientInfo] = useState({
        name: '',
        groupName: '',
        email: '',
        phone: '',
        notes: ''
    });

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            fetchExistingBookings();
        }
    }, [selectedDate]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('is_active', true);

            if (error) throw error;

            const fetchedServices = data || [];
            setServices(fetchedServices);

            // Auto-select initial services if provided
            if (initialServiceIds && initialServiceIds.length > 0) {
                const found = fetchedServices.filter((s) =>
                    initialServiceIds.some((id) =>
                        s.id === id ||
                        s.title?.toLowerCase().includes(id.split('-')[0].toLowerCase())
                    )
                );

                if (found.length > 0) {
                    setSelectedServices(found);
                    setStep(2);
                }
            }
        } catch (err) {
            console.error('Error fetching services:', err);
            setError('Could not load services. Please check your Supabase connection.');
        } finally {
            setLoading(false);
        }
    };

    const fetchExistingBookings = async () => {
        try {
            setFetchingSlots(true);

            const startOfDay = new Date(selectedDate);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(selectedDate);
            endOfDay.setHours(23, 59, 59, 999);

            const { data, error } = await supabase
                .from('bookings')
                .select('start_time, end_time')
                .gte('start_time', startOfDay.toISOString())
                .lte('start_time', endOfDay.toISOString());

            if (error) throw error;

            setExistingBookings(data || []);
        } catch (err) {
            console.error('Error fetching existing bookings:', err);
        } finally {
            setFetchingSlots(false);
        }
    };

    const handleServiceToggle = (service) => {
        setSelectedServices((prev) => {
            const isAlreadySelected = prev.some((s) => s.id === service.id);

            if (isAlreadySelected) {
                return prev.filter((s) => s.id !== service.id);
            }

            return [...prev, service];
        });
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeSelect = (time) => {
        if (isSlotBooked(time)) return;
        setSelectedTime(time);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientInfo((prev) => ({ ...prev, [name]: value }));
    };

    const isSlotBooked = (time) => {
        if (!selectedDate || !existingBookings.length) return false;

        const [hours, minutes] = time.split(':');
        const slotStart = new Date(selectedDate);
        slotStart.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

        const totalDuration = selectedServices.reduce(
            (total, s) => total + (s.duration_minutes || 60),
            0
        );

        const slotEnd = new Date(slotStart.getTime() + totalDuration * 60000);

        return existingBookings.some((booking) => {
            const bookingStart = new Date(booking.start_time);
            const bookingEnd = new Date(booking.end_time);

            return slotStart < bookingEnd && slotEnd > bookingStart;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedServices.length === 0 || !selectedDate || !selectedTime) {
            setError('Please complete all booking steps before submitting.');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const [hours, minutes] = selectedTime.split(':');
            const startTime = new Date(selectedDate);
            startTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

            const totalDuration = selectedServices.reduce(
                (total, s) => total + (s.duration_minutes || 60),
                0
            );

            const endTime = new Date(startTime.getTime() + totalDuration * 60000);

            let minPrice = 0;
            let maxPrice = 0;
            let isRange = false;

            selectedServices.forEach((s) => {
                const prices = s.price_display?.match(/\d+[,]?\d*/g);

                if (prices) {
                    const nums = prices.map((p) => parseInt(p.replace(/,/g, ''), 10));

                    if (nums.length > 1) {
                        minPrice += nums[0];
                        maxPrice += nums[1];
                        isRange = true;
                    } else {
                        minPrice += nums[0];
                        maxPrice += nums[0];
                    }
                }
            });

            const formatPrice = (num) =>
                `KES ${new Intl.NumberFormat('en-KE').format(num)}`;

            const totalPriceDisplay = isRange
                ? `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
                : formatPrice(minPrice);

            const { error: insertError } = await supabase
                .from('bookings')
                .insert([
                    {
                        service_id: selectedServices[0].id,
                        selected_service_ids: selectedServices.map((s) => s.id),
                        total_estimated_price: totalPriceDisplay,
                        start_time: startTime.toISOString(),
                        end_time: endTime.toISOString(),
                        client_name: clientInfo.name,
                        group_name: clientInfo.groupName,
                        client_email: clientInfo.email,
                        client_phone: clientInfo.phone,
                        notes: clientInfo.notes
                    }
                ]);

            if (insertError) throw insertError;

            setStep(4);
        } catch (err) {
            console.error('Error creating booking:', err);
            setError('Failed to book session. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-nova-gold animate-spin mb-4" />
                <p className="text-nova-gray-600 font-medium">Loading available services...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center mb-8">
                <button
                    onClick={step === 1 ? onBack : prevStep}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
                >
                    <ChevronLeft className="w-6 h-6 text-nova-navy" />
                </button>

                <div>
                    <h2 className="text-2xl font-bold text-nova-navy">Book Your Session</h2>
                    <p className="text-nova-gray-500">
                        {step <= 3 ? `Step ${step} of 3` : 'Booking Confirmed'}
                    </p>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-semibold mb-6">Select a Service</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {services.map((service) => {
                                const isSelected = selectedServices.some((s) => s.id === service.id);

                                return (
                                    <div
                                        key={service.id}
                                        onClick={() => handleServiceToggle(service)}
                                        className={`p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${isSelected
                                                ? 'border-nova-gold bg-nova-gold/5'
                                                : 'border-gray-200 bg-white'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-lg text-nova-navy">
                                                {service.title}
                                            </h4>
                                            {isSelected && (
                                                <CheckCircle2 className="w-5 h-5 text-nova-gold" />
                                            )}
                                        </div>

                                        <p className="text-nova-gray-600 text-sm mb-4 line-clamp-2">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center text-nova-gold font-bold">
                                            <span>
                                                {service.price_display ||
                                                    (service.price === 0
                                                        ? 'Free Consultation'
                                                        : `KES ${service.price}`)}
                                            </span>
                                            <span className="ml-auto text-xs text-nova-gray-400">
                                                {service.duration_minutes} min
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-end mt-8">
                            <button
                                onClick={nextStep}
                                disabled={selectedServices.length === 0}
                                className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${selectedServices.length > 0
                                        ? 'bg-nova-gold text-nova-navy shadow-lg hover:bg-yellow-500'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Continue <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-nova-gold" />
                                Select Date & Time
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />

                                <div className="space-y-4">
                                    <h4 className="font-medium text-nova-navy flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        Available Times{' '}
                                        {selectedDate && `for ${selectedDate.toLocaleDateString()}`}
                                    </h4>

                                    {!selectedDate ? (
                                        <p className="text-nova-gray-400 italic">
                                            Please select a date first
                                        </p>
                                    ) : fetchingSlots ? (
                                        <div className="flex items-center gap-2 text-nova-gray-500 py-4">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <p>Checking availability...</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                '09:00',
                                                '10:00',
                                                '11:00',
                                                '13:00',
                                                '14:00',
                                                '15:00',
                                                '16:00'
                                            ].map((time) => {
                                                const booked = isSlotBooked(time);

                                                return (
                                                    <button
                                                        key={time}
                                                        onClick={() => handleTimeSelect(time)}
                                                        disabled={booked}
                                                        className={`py-3 rounded-lg border text-sm font-medium transition-all ${selectedTime === time
                                                                ? 'bg-nova-gold border-nova-gold text-nova-navy shadow-md'
                                                                : booked
                                                                    ? 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed'
                                                                    : 'bg-white border-gray-200 text-nova-gray-600 hover:border-nova-gold'
                                                            }`}
                                                    >
                                                        {time}
                                                        {booked && (
                                                            <span className="block text-[10px] opacity-60">
                                                                Booked
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={prevStep}
                                className="px-6 py-2 text-nova-navy font-medium hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Back to Services
                            </button>

                            <button
                                onClick={nextStep}
                                disabled={
                                    selectedServices.length === 0 ||
                                    !selectedDate ||
                                    !selectedTime
                                }
                                className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${selectedServices.length > 0 &&
                                        selectedDate &&
                                        selectedTime
                                        ? 'bg-nova-gold text-nova-navy shadow-lg hover:bg-yellow-500'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Continue <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-xl mx-auto"
                    >
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-nova-gold" />
                                Contact Information
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-nova-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={clientInfo.name}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-gold focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-nova-gray-700 mb-1">
                                        Group / SME Name
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            name="groupName"
                                            value={clientInfo.groupName}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-gold focus:border-transparent outline-none transition-all"
                                            placeholder="e.g. Upendo Chama or ABC Ltd"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-nova-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={clientInfo.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-gold focus:border-transparent outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-nova-gray-700 mb-1">
                                        Phone Number (Optional)
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={clientInfo.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-gold focus:border-transparent outline-none transition-all"
                                            placeholder="+254 700 000 000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-nova-gray-700 mb-1">
                                        Anything else we should know?
                                    </label>
                                    <textarea
                                        name="notes"
                                        value={clientInfo.notes}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nova-gold focus:border-transparent outline-none transition-all"
                                        rows="3"
                                        placeholder="Briefly describe your needs..."
                                    />
                                </div>

                                <div className="pt-4 flex flex-col items-center gap-4">
                                    {selectedServices.length > 0 &&
                                        selectedDate &&
                                        selectedTime && (
                                            <div className="w-full p-4 bg-nova-navy/5 rounded-xl text-sm space-y-3 mb-4">
                                                <p className="font-semibold text-nova-navy border-b border-nova-navy/10 pb-1">
                                                    Booking Summary:
                                                </p>

                                                <div className="space-y-1">
                                                    <p className="text-nova-gray-500 text-[10px] uppercase tracking-wider font-bold">
                                                        Selected Services:
                                                    </p>

                                                    {selectedServices.map((s) => (
                                                        <div
                                                            key={s.id}
                                                            className="flex justify-between items-center bg-white/50 p-2 rounded border border-nova-navy/5"
                                                        >
                                                            <span className="font-medium">
                                                                {s.title}
                                                            </span>
                                                            <span className="text-nova-gold text-xs">
                                                                {s.price_display}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {clientInfo.groupName && (
                                                    <p>
                                                        <span className="text-nova-gray-500">
                                                            Group:
                                                        </span>{' '}
                                                        {clientInfo.groupName}
                                                    </p>
                                                )}

                                                <div className="pt-1 border-t border-nova-navy/10 flex justify-between items-center text-nova-navy font-bold">
                                                    <span>Total Duration:</span>
                                                    <span>
                                                        {selectedServices.reduce(
                                                            (t, s) =>
                                                                t +
                                                                (s.duration_minutes || 60),
                                                            0
                                                        )}{' '}
                                                        mins
                                                    </span>
                                                </div>

                                                <p className="text-nova-gray-500 italic text-[10px]">
                                                    Date: {selectedDate.toDateString()} at{' '}
                                                    {selectedTime}
                                                </p>
                                            </div>
                                        )}

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-nova-navy text-white text-lg font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>
                                                Confirm Booking{' '}
                                                <CheckCircle2 className="w-6 h-6" />
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        disabled={submitting}
                                        className="text-nova-gray-500 hover:text-nova-navy transition-colors font-medium"
                                    >
                                        Change date or time
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 px-6"
                    >
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>

                        <h2 className="text-3xl font-bold text-nova-navy mb-4">
                            You're All Set!
                        </h2>

                        <div className="text-nova-gray-600 mb-8 max-w-md mx-auto">
                            <p className="mb-4">Your session for:</p>

                            <div className="space-y-2 mb-6">
                                {selectedServices.map((s) => (
                                    <div
                                        key={s.id}
                                        className="bg-nova-navy/5 p-3 rounded-lg border border-nova-navy/10 text-nova-navy font-bold"
                                    >
                                        {s.title}
                                    </div>
                                ))}
                            </div>

                            <p>
                                {clientInfo.groupName && (
                                    <>
                                        for{' '}
                                        <span className="font-bold text-nova-navy">
                                            {clientInfo.groupName}
                                        </span>{' '}
                                    </>
                                )}
                                is confirmed for{' '}
                                <span className="font-bold text-nova-navy">
                                    {selectedDate.toLocaleDateString()} at {selectedTime}
                                </span>
                                .
                            </p>
                        </div>

                        <p className="text-nova-gray-500 mb-12">
                            Booking has been saved successfully for{' '}
                            <span className="font-medium text-nova-navy">
                                {clientInfo.email}
                            </span>
                            .
                        </p>

                        <button
                            onClick={onBack}
                            className="bg-nova-gold text-nova-navy font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-yellow-500 transition-all active:scale-95"
                        >
                            Back to Overview
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BookingManager;