import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://korzfesxusotyszxhpck.supabase.co',
  'sb_publishable_63S3PSDQNvKA18kpold3qg_IBFb4Euf'
);

async function checkSchema() {
  console.log('Checking bookings table schema...');
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error selecting from bookings:', error.message);
  } else {
    console.log('Successfully selected from bookings.');
    if (data && data.length > 0) {
      console.log('Columns in first row:', Object.keys(data[0]));
    } else {
      console.log('Table is empty, cannot easily check columns via select.');
    }
  }
}

checkSchema();
