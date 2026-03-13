import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function cleanupBookings() {
    console.log('--- Database Cleanup: Removing Test Bookings ---');
    
    // Let's first fetch all IDs to be absolutely sure what we are deleting
    const { data: fetchAll, error: fetchErr } = await supabase.from('bookings').select('id');
    
    if (fetchErr) {
        console.error('❌ Error fetching bookings:', fetchErr.message);
        return;
    }

    if (!fetchAll || fetchAll.length === 0) {
        console.log('✅ No bookings found to delete.');
        return;
    }

    const ids = fetchAll.map(b => b.id);
    console.log(`Found ${ids.length} bookings. Deleting...`);

    const { error: deleteErr, count } = await supabase
        .from('bookings')
        .delete({ count: 'exact' })
        .in('id', ids);

    if (deleteErr) {
        console.error('❌ Error during cleanup:', deleteErr.message);
    } else {
        console.log(`✅ SUCCESS: Removed ${count} test booking(s).`);
    }
}

cleanupBookings();
