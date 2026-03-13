export const SERVICE_DATA = {
    'onb-1': { title: 'Chama Onboarding', price: 'KES 10,000' },
    'onb-2': { title: 'SME / Entrepreneur Onboarding', price: 'KES 20,000' },
    'onb-3': { title: 'SACCO Onboarding', price: 'KES 30,000' },
    'ret-1': { title: 'Chama — Small (<20 members)', price: 'KES 100K - 200K' },
    'ret-2': { title: 'Chama — Medium (21-50 members)', price: 'KES 200K - 350K' },
    'ret-3': { title: 'SME — Small (Turnover 5M-50M)', price: 'KES 170K - 350K' },
    'ret-4': { title: 'SME — Medium (Turnover 50M-500M)', price: 'KES 350K - 700K' },
    'ret-5': { title: 'SACCO — Small (<500 members)', price: 'KES 280K - 520K' },
    'ret-6': { title: 'SACCO — Medium (500-2,000 members)', price: 'KES 500K - 850K' },
    'spec-1': { title: 'Investment Policy Statement (IPS)', price: 'KES 30K - 80K' },
    'spec-2': { title: 'Financial Wellness Workshop', price: 'KES 15K - 50K' },
    'spec-3': { title: 'Business Valuation Advisory', price: 'KES 80K - 250K' },
    'spec-4': { title: 'Occupational Pension Setup', price: 'KES 40K - 100K' },
    'spec-5': { title: 'Governance Review', price: 'KES 25K - 60K' },
    'spec-6': { title: 'Pick Our Brain from Nova Wealth Experts', price: 'KES 20,000' },
    'comp-1': { title: 'SME Strategic Advisory', price: 'Complimentary' },
    'comp-2': { title: 'Group Wealth Planning', price: 'Complimentary' },
    'comp-3': { title: 'Tax & Compliance Audit', price: 'Complimentary' }
};

/**
 * Calculates total duration and price display for selected services
 */
export const calculateBookingTotals = (primaryServices, complimentaryServices) => {
    const allSelected = [...primaryServices, ...complimentaryServices];
    
    // Duration
    const totalDuration = allSelected.reduce(
        (total, s) => total + (s.duration_minutes || 60),
        0
    );

    // Price
    let minPrice = 0;
    let maxPrice = 0;
    let isRange = false;

    allSelected.forEach((s) => {
        const prices = s.price_display?.match(/\d+[,]?\d*K?/gi);

        if (prices) {
            const nums = prices.map((p) => {
                let val = parseInt(p.replace(/,/g, '').replace(/K/gi, ''), 10);
                if (p.toLowerCase().includes('k')) val *= 1000;
                return val;
            });

            if (nums.length > 1) {
                minPrice += nums[0];
                maxPrice += nums[1];
                isRange = true;
            } else if (nums.length === 1) {
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

    return {
        totalDuration,
        minPrice,
        maxPrice,
        isRange,
        totalPriceDisplay
    };
};
