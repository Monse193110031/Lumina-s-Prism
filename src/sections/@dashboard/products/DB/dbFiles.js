import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = 'https://tuqucrxjlntjlgfwzcjf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1cXVjcnhqbG50amxnZnd6Y2pmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2MzA1OTksImV4cCI6MTk5ODIwNjU5OX0.4o4Nx9oQHh9QDwoJ1X4eiv2J_eL71yuHGlOv2GRny7c';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function handleFileUpload(file) {
  const fileId = uuidv4();
  const { data, error } = await supabase.storage.from('images').upload(`my-folder/${fileId}`, file, {
    cacheControl: '3600',
    upsert: true,
  });

  if (error) {
    console.log(error);
    return error;
  }
  console.log(data);
  return data;
}

export async function createProduct(prodcut) {
  const { data, error } = await supabase.from('Producto').insert([prodcut]);

  return false;
}

export async function deleteProduct(prodcut) {
  const { error } = await supabase.from('Producto').delete().eq('idProducto', prodcut.id);

  return error;
}

export async function getProducts() {
  const { data, error } = await supabase.from('Producto').select();
  return data;
}

export async function getProviders() {
  const { data } = await supabase.from('Proveedor').select();

  console.log(data);
  return data;
}

export async function getImage(location) {
  const { data } = supabase.storage.from('images').getPublicUrl(location);

  return data;
}
