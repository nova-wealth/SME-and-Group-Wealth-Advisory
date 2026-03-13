import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://korzfesxusotyszxhpck.supabase.co',
  'sb_publishable_63S3PSDQNvKA18kpold3qg_IBFb4Euf'
);

async function checkServices() {
    try {
        const { data, error } = await supabase.from('services').select('*');
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Services in DB:');
            console.table(data.map(s => ({ 
                id: s.id, 
                title: s.title, 
                price_display: s.price_display,
                price: s.price,
                is_active: s.is_active
            })));
        }
    } catch (e) {
        console.error('Crash:', e);
    }
}

checkServices();
