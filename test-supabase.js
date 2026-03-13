
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
    console.log('Testing Supabase connection...');
    console.log('URL:', supabaseUrl);
    
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching bookings:', error);
    } else {
        console.log('Successfully fetched bookings.');
        if (data.length > 0) {
            console.log('Column names:', Object.keys(data[0]));
        } else {
            console.log('No bookings found to check columns.');
            // Try inserting a dummy record to see if it works or which column is missing
        }
    }

    const { data: services, error: sError } = await supabase
        .from('services')
        .select('*')
        .limit(1);

    if (sError) {
        console.error('Error fetching services:', sError);
    } else {
        console.log('Successfully fetched services.');
    }
}

test();
