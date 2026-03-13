import { describe, it, expect } from 'vitest';
import { calculateBookingTotals } from '../utils/bookingUtils';

describe('Booking Logic Utilities', () => {
    it('should correctly calculate total duration for multiple services', () => {
        const primary = [{ id: 'onb-1', duration_minutes: 60 }];
        const comp = [{ id: 'comp-1', duration_minutes: 30 }];
        const { totalDuration } = calculateBookingTotals(primary, comp);
        expect(totalDuration).toBe(90);
    });

    it('should fallback to 60 minutes if duration is missing', () => {
        const primary = [{ id: 'onb-1' }];
        const { totalDuration } = calculateBookingTotals(primary, []);
        expect(totalDuration).toBe(60);
    });

    it('should correctly calculate fixed price display', () => {
        const primary = [{ id: 'onb-1', price_display: 'KES 10,000' }];
        const { totalPriceDisplay } = calculateBookingTotals(primary, []);
        expect(totalPriceDisplay).toBe('KES 10,000');
    });

    it('should correctly sum multiple fixed prices', () => {
        const primary = [
            { id: 'onb-1', price_display: 'KES 10,000' },
            { id: 'onb-2', price_display: 'KES 20,000' }
        ];
        const { totalPriceDisplay } = calculateBookingTotals(primary, []);
        expect(totalPriceDisplay).toBe('KES 30,000');
    });

    it('should correctly handle price ranges with K multiplier', () => {
        const primary = [{ id: 'ret-1', price_display: 'KES 100K - 200K' }];
        const { totalPriceDisplay, minPrice, maxPrice, isRange } = calculateBookingTotals(primary, []);
        expect(isRange).toBe(true);
        expect(minPrice).toBe(100000);
        expect(maxPrice).toBe(200000);
        expect(totalPriceDisplay).toBe('KES 100,000 - KES 200,000');
    });

    it('should sum ranges and fixed prices correctly', () => {
        const primary = [
            { id: 'onb-1', price_display: 'KES 10,000' },
            { id: 'ret-1', price_display: 'KES 100K - 200K' }
        ];
        const { totalPriceDisplay, minPrice, maxPrice } = calculateBookingTotals(primary, []);
        expect(minPrice).toBe(110000);
        expect(maxPrice).toBe(210000);
        expect(totalPriceDisplay).toBe('KES 110,000 - KES 210,000');
    });

    it('should ignore complimentary services in price sum but include in duration', () => {
        const primary = [{ id: 'onb-1', price_display: 'KES 10,000', duration_minutes: 60 }];
        const comp = [{ id: 'comp-1', price_display: 'Complimentary', duration_minutes: 30 }];
        const { totalDuration, totalPriceDisplay } = calculateBookingTotals(primary, comp);
        expect(totalDuration).toBe(90);
        expect(totalPriceDisplay).toBe('KES 10,000');
    });
});
