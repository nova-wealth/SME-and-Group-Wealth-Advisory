import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function checkBookings() {
    const { data, error } = await supabase.from('bookings').select('id');
    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log(`Found ${data ? data.length : 0} bookings.`);
    }
}

checkBookings();
