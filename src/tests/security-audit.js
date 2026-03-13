import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkSecurity() {
    console.log('--- DevOps Security Audit: Supabase Row Level Security (RLS) ---');
    
    // Check if we can read the policies (requires manual check in dashboard or a function)
    // Here we will try to perform unauthorized actions to see if they are blocked
    
    console.log('\n1. Testing Public Write access to "services" (SHOULD BE BLOCKED)...');
    const { error: serviceError } = await supabase
        .from('services')
        .insert({ title: 'MALICIOUS SERVICE', price: 0 });
    
    if (serviceError) {
        console.log('✅ PASS: Unauthorized write to "services" blocked.');
    } else {
        console.log('❌ FAIL: "services" table allows public writes!');
    }

    console.log('\n2. Testing Public Read access to "bookings" (SHOULD BE BLOCKED if RLS is on)...');
    const { data: bookings, error: bookingReadError } = await supabase
        .from('bookings')
        .select('*');
    
    if (bookings && bookings.length > 0) {
        console.log('❌ FAIL: "bookings" table allows public reads! Sensitive client info exposed.');
    } else {
        console.log('✅ PASS: Public read from "bookings" blocked or returned no data.');
    }

    console.log('\n3. Testing Public Write access to "bookings" (REQUIRED for public bookings)...');
    // Note: We normally want users to be able to BOOK, but maybe restricted?
    // Ideally only via API or restricted RLS.
}

checkSecurity();
