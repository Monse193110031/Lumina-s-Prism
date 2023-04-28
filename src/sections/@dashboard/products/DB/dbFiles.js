import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = 'https://tuqucrxjlntjlgfwzcjf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1cXVjcnhqbG50amxnZnd6Y2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MzA1OTksImV4cCI6MTk5ODIwNjU5OX0.4o4Nx9oQHh9QDwoJ1X4eiv2J_eL71yuHGlOv2GRny7c';
const supabase = createClient(supabaseUrl, supabaseKey);

async function handleFileUpload(event) {
  const file = event.target.files[0];
  const fileId = uuidv4();
  const { data, error } = await supabase.storage.from('images').upload(`my-folder/${fileId}`, file, {
    cacheControl: '3600',
    upsert: true,
  });
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
}

async function createProduct() {
  return false;
}

async function getProviders() {
  const pro = await supabase.from('proveedores').select('*');
  console.log(pro) 
  return pro;
}

export default { handleFileUpload, createProduct, getProviders };
