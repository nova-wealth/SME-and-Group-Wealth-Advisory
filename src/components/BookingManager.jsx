import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Lightbulb
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Calendar from './Calendar';
import { SERVICE_DATA, calculateBookingTotals } from '../utils/bookingUtils';


const BookingManager = ({ onBack, initialServiceIds = [] }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [existingBookings, setExistingBookings] = useState([]);
    const [fetchingSlots, setFetchingSlots] = useState(false);
    const [emailError, setEmailError] = useState(null);

    // Form State
    const [primaryServices, setPrimaryServices] = useState([]);
    const [complimentaryServices, setComplimentaryServices] = useState([]);
    const [allServices, setAllServices] = useState([]);
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
        const loadServices = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .eq('is_active', true);

                if (error) throw error;

                const fetchedServices = data || [];
                setAllServices(fetchedServices);

                if (initialServiceIds && initialServiceIds.length > 0) {
                    const found = fetchedServices.filter((s) =>
                        initialServiceIds.some((id) =>
                            s.id === id ||
                            s.title?.toLowerCase().trim() === id.toLowerCase().trim() ||
                            (id.includes('-') && s.title?.toLowerCase().includes(id.split('-')[0].toLowerCase()))
                        )
                    );

                    if (found.length > 0) {
                        setPrimaryServices(found);
                    } else {
                        // Fallback: If service title is passed but not in DB yet
                        // Create a virtual primary service so the user still sees what they picked
                        const virtualServices = initialServiceIds.map(id => {
                            const data = SERVICE_DATA[id] || { 
                                title: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                                price: 'Retainer / Project Base'
                            };
                            return {
                                id: `virtual-${id}`,
                                title: data.title,
                                price_display: data.price,
                                price: 0,
                                duration_minutes: 60,
                                isVirtual: true
                            };
                        });
                        setPrimaryServices(virtualServices);
                    }
                    setStep(1);
                }
            } catch (err) {
                console.error('Error fetching services:', err);
                setError('Could not load services. Please check your Supabase connection.');
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, [initialServiceIds]);

    useEffect(() => {
        if (!selectedDate) return;
        const loadExistingBookings = async () => {
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
        loadExistingBookings();
    }, [selectedDate]);

    

    const handleServiceToggle = (service) => {
        setPrimaryServices((prev) => {
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

    const handleComplimentaryToggle = (service) => {
        setComplimentaryServices((prev) => {
            const isAlreadySelected = prev.some((s) => s.id === service.id);
            if (isAlreadySelected) {
                return prev.filter((s) => s.id !== service.id);
            }
            // Usually allow only one complimentary add-on or a few
            return [...prev, service];
        });
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

        const { totalDuration } = calculateBookingTotals(primaryServices, complimentaryServices);

        const slotEnd = new Date(slotStart.getTime() + totalDuration * 60000);

        return existingBookings.some((booking) => {
            const bookingStart = new Date(booking.start_time);
            const bookingEnd = new Date(booking.end_time);

            return slotStart < bookingEnd && slotEnd > bookingStart;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (primaryServices.length === 0 || !selectedDate || !selectedTime) {
            setError('Please complete all booking steps before submitting.');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const [hours, minutes] = selectedTime.split(':');
            const startTime = new Date(selectedDate);
            startTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

            const { totalDuration, totalPriceDisplay } = calculateBookingTotals(primaryServices, complimentaryServices);

            const endTime = new Date(startTime.getTime() + totalDuration * 60000);

            // Try to insert with all columns first
            let { data: inserted, error: insertError } = await supabase
                .from('bookings')
                .insert([
                    {
                        service_id: primaryServices[0].id.includes('virtual') ? null : primaryServices[0].id,
                        selected_service_ids: [...primaryServices, ...complimentaryServices].filter(s => !s.id.includes('virtual')).map((s) => s.id),
                        total_estimated_price: totalPriceDisplay,
                        start_time: startTime.toISOString(),
                        end_time: endTime.toISOString(),
                        client_name: clientInfo.name,
                        group_name: clientInfo.groupName,
                        client_email: clientInfo.email,
                        client_phone: clientInfo.phone,
                        notes: clientInfo.notes
                    }
                ])
                .select()
                .single();

            // If it fails with a missing column error, try a fallback insert with core columns
            if (insertError) {
                console.warn('Full insert failed, attempting fallback:', insertError.message);
                
                // Construct notes with extra info since columns are missing
                const enrichedNotes = `
[EXTRA INFO] 
[EXTRA INFO] 
Group: ${clientInfo.groupName}
Estimated Price: ${totalPriceDisplay}
All Services: ${[...primaryServices, ...complimentaryServices].map(s => s.title).join(', ')}
-----------------
${clientInfo.notes}
                `.trim();

                const { data: fallbackInserted, error: fallbackError } = await supabase
                    .from('bookings')
                    .insert([
                        {
                            service_id: primaryServices[0].id.includes('virtual') ? null : primaryServices[0].id,
                            start_time: startTime.toISOString(),
                            end_time: endTime.toISOString(),
                            client_name: clientInfo.name,
                            client_email: clientInfo.email,
                            client_phone: clientInfo.phone,
                            notes: enrichedNotes
                        }
                    ])
                    .select()
                    .single();

                if (fallbackError) throw fallbackError;
                inserted = fallbackInserted;
            }

            try {
                const formattedDate = selectedDate.toLocaleDateString('en-KE', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });

                const { data: fnData, error: fnErr } = await supabase.functions.invoke('send-booking-emails', {
                    body: {
                        bookingId: inserted?.id,
                        clientName: clientInfo.name,
                        groupName: clientInfo.groupName,
                        clientEmail: clientInfo.email,
                        clientPhone: clientInfo.phone,
                        notes: clientInfo.notes,
                        primaryServices: primaryServices.map((s) => ({
                            title: s.title,
                            price_display: s.price_display
                        })),
                        complimentaryServices: complimentaryServices.map((s) => ({
                            title: s.title
                        })),
                        selectedDate: formattedDate,
                        selectedTime,
                        totalEstimatedPrice: totalPriceDisplay
                    }
                });

                if (fnErr) {
                    console.error('Full Edge Function Error:', fnErr);
                    setEmailError(`Function error: ${fnErr.message || 'Unknown network error'}`);
                    
                    if (fnErr.message?.includes('Failed to fetch')) {
                        console.warn('Network error: This might be a CORS issue or the function is not deployed.');
                    }
                } else if (fnData?.success === false) {
                    console.error('Email sending failed:', fnData.error);
                    setEmailError(`Delivery failed: ${fnData.error}`);
                } else {
                    console.log('Email sent successfully:', fnData);
                    setEmailError(null);
                }
            } catch (emailErr) {
                console.error('Error triggering email function:', emailErr);
                setEmailError(`Trigger error: ${emailErr.message}`);
            }

            setStep(4);
        } catch (err) {
            console.error('Unexpected frontend error:', err);
            setError(`Booking failed: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-nova-gold animate-spin mb-4" />
                <p className="text-nova-gray-600 font-medium">Loading available services...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 md:py-8">
            {/* Header */}
            <div className="flex items-center mb-8">
                <button
                    onClick={step === 1 ? onBack : prevStep}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4"
                >
                    <ChevronLeft className="w-6 h-6 text-nova-navy" />
                </button>

                <div>
                    <h2 className="text-2xl font-bold text-nova-navy">Complete Your Booking</h2>
                    <p className="text-nova-gray-500">
                        {step <= 3 ? `Step ${step} of 3` : 'Booking Confirmed'}
                    </p>
                </div>
            </div>

            {step === 1 && primaryServices.length > 0 && (
                <div className="mb-6 md:mb-8 p-4 md:p-6 bg-nova-navy/5 border border-nova-navy/10 rounded-2xl flex items-center justify-between">
                    <div className="flex-1">
                        <span className="text-nova-navy/60 text-[10px] uppercase tracking-widest font-bold mb-1 block">Your Primary Selection</span>
                        <h4 className="text-lg md:text-xl font-bold text-nova-navy">{primaryServices[0]?.title}</h4>
                        <p className="text-nova-gold font-bold text-sm md:text-base">{primaryServices[0]?.price_display || 'Retainer Based'}</p>
                    </div>
                    <div className="hidden sm:block">
                        <CheckCircle2 className="w-8 h-8 md:w-12 md:h-12 text-nova-gold opacity-20" />
                    </div>
                </div>
            )}

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
                        className="space-y-8"
                    >
                        {/* Expert Guidance Banner */}
                        <div className="bg-nova-navy text-white p-5 md:p-6 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles className="w-16 h-16 md:w-24 md:h-24" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-nova-gold" />
                                    <span className="text-nova-gold font-bold text-[10px] md:text-xs uppercase tracking-widest">Expert Recommendations</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-white">Maximize Your Engagement</h3>
                                <p className="text-nova-gray-300 text-xs md:text-sm leading-relaxed max-w-2xl">
                                    As financial experts with 20+ years of experience, we ensure that your advisory focus is built on a professional foundation for long-term wealth strategy.
                                </p>
                            </div>
                        </div>

                        <section>
                            <h3 className="text-xl font-semibold mb-4 text-nova-navy flex items-center gap-2">
                                2. Finalize with a Complimentary Add-on
                                <span className="text-nova-gold text-[10px] bg-nova-gold/10 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Expert Recommended</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {allServices
                                    .filter((s) => s.price === 0 || s.price_display?.toLowerCase()?.includes('complimentary'))
                                    .map((service) => {
                                    const isSelected = complimentaryServices.some((s) => s.id === service.id);

                                        return (
                                            <div
                                                key={service.id}
                                                onClick={() => handleComplimentaryToggle(service)}
                                                className={`p-6 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${isSelected
                                                        ? 'border-nova-gold bg-nova-gold/5 shadow-md'
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
                                                                ? 'Complimentary'
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
                        </section>



                        <div className="flex justify-end mt-8">
                            <button
                                onClick={nextStep}
                                disabled={primaryServices.length === 0}
                                className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${primaryServices.length > 0
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
                                Back
                            </button>

                            <button
                                onClick={nextStep}
                                disabled={
                                    primaryServices.length === 0 ||
                                    !selectedDate ||
                                    !selectedTime
                                }
                                className={`px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${primaryServices.length > 0 &&
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
                                    {primaryServices.length > 0 &&
                                        selectedDate &&
                                        selectedTime && (
                                            <div className="w-full p-4 bg-nova-navy/5 rounded-xl text-sm space-y-3 mb-4">
                                                <p className="font-semibold text-nova-navy border-b border-nova-navy/10 pb-1">
                                                    Booking Summary:
                                                </p>

                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-nova-gray-500 text-[10px] uppercase tracking-wider font-bold mb-1">
                                                            Primary Service:
                                                        </p>
                                                        {primaryServices.map((s) => (
                                                            <div
                                                                key={s.id}
                                                                className="flex justify-between items-center bg-white/80 p-2 rounded border border-nova-navy/5"
                                                            >
                                                                <span className="font-bold text-nova-navy">
                                                                    {s.title}
                                                                </span>
                                                                <span className="text-nova-gold font-bold">
                                                                    {s.price_display || 'Retainer Based'}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {complimentaryServices.length > 0 && (
                                                        <div>
                                                            <p className="text-nova-gray-500 text-[10px] uppercase tracking-wider font-bold mb-1">
                                                                Complimentary Add-on:
                                                            </p>
                                                            {complimentaryServices.map((s) => (
                                                                <div
                                                                    key={s.id}
                                                                    className="flex justify-between items-center bg-white/50 p-2 rounded border border-nova-navy/5"
                                                                >
                                                                    <span className="font-medium text-nova-navy/80 italic">
                                                                        {s.title}
                                                                    </span>
                                                                    <span className="text-green-600 font-bold text-xs uppercase tracking-tighter bg-green-50 px-2 py-0.5 rounded">
                                                                        Ksh 0
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-nova-navy/10">
                                                    <div className="flex flex-col">
                                                        <span className="text-nova-gray-400 font-medium">Date & Time:</span>
                                                        <span className="font-bold text-nova-navy capitalize">
                                                            {selectedDate.toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric' })} at {selectedTime}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col text-right">
                                                        <span className="text-nova-gray-400 font-medium">Total Duration:</span>
                                                        <span className="font-bold text-nova-navy">
                                                            {calculateBookingTotals(primaryServices, complimentaryServices).totalDuration} mins
                                                        </span>
                                                    </div>
                                                </div>

                                                {clientInfo.groupName && (
                                                    <p className="text-[10px] text-nova-gray-400 italic">
                                                        Booking on behalf of: <span className="text-nova-navy font-bold">{clientInfo.groupName}</span>
                                                    </p>
                                                )}
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
                                        Back
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
                            Booking Confirmed
                        </h2>

                        <div className="text-nova-gray-600 mb-8 max-w-md mx-auto">
                            <p className="mb-4">Your session for:</p>

                            <div className="space-y-2 mb-6">
                                {primaryServices.concat(complimentaryServices).map((s) => (
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
                            <div className="mt-6 text-sm text-nova-navy bg-nova-navy/5 border border-nova-navy/10 p-4 rounded-lg">
                                <p className="font-semibold">Your booking has been confirmed.</p>
                                <p>A confirmation email has been sent to the client at {clientInfo.email}.</p>
                                <p>Nova Wealth has also been notified at info@novawealth.co.ke.</p>
                            </div>

                            {emailError && (
                                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3 text-left">
                                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-orange-800 font-bold text-xs uppercase mb-1">Email Delivery Notice</p>
                                        <p className="text-orange-700 text-xs text-balance">
                                            The booking was saved, but the confirmation email could not be sent. <br/>
                                            <strong>Error:</strong> {emailError}
                                        </p>
                                        <p className="text-orange-600 text-[10px] mt-2 italic">
                                            Note: If using a test sender, ensure you are sending to the Resend account owner's email.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="text-nova-gray-500 mb-12">
                            Booking details have been saved successfully.
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
BookingManager.propTypes = {
    onBack: PropTypes.func.isRequired,
    initialServiceIds: PropTypes.array
};
