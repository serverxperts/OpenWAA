const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);

    const testTable = process.env.SUPABASE_TEST_TABLE || 'api_keys';
    supabase
      .from(testTable)
      .select('*')
      .limit(1)
      .then(({ data, error }) => {
        if (error) console.log('[Supabase] Info:', error.message);
        else console.log('[Supabase] Connected successfully');
      })
      .catch(() => {});
  } catch (err) {
    console.warn('[Supabase] Client init skipped:', err.message);
  }
}

module.exports = supabase;
