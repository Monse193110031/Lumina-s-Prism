import { createClient } from '@supabase/supabase-js';
import { da, id } from 'date-fns/locale';
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

export async function createProduct(product) {
  const { data, error } = await supabase.from('Producto').insert([product]);

  return false;
}

export async function updateProduct(product, id) {
  const { data, error } = await supabase.from('Producto').update(product).eq('idProducto', id);

  return data;
}

export async function deleteProduct(product) {
  const { error } = await supabase.from('Producto').delete().eq('idProducto', product.id);

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

export async function createSale(sale) {
  const { data, error } = await supabase.from('Venta').insert([sale]).select().single();
  console.log(data);
  return data;
}

export async function quoteSale(idCliente) {
  const { data, error } = await supabase.from('CuentaBancaria').select().eq('idCliente', idCliente).single();
  console.log(data);
  return data;
}

export async function updatebalance(idCliente, saldo) {
  const { data, error } = await supabase.from('CuentaBancaria').update({ saldo }).eq('idCliente', idCliente);
  console.log(data);
  return data;
}

export async function getSales() {
  const { data, error } = await supabase.from('Venta').select();
  return data;
}

export async function createSaleDetail(saleDetail) {
  const { data, error } = await supabase.from('VentasDetalle').insert([saleDetail]);
  return false;
}

export async function getClientSales(id) {
  const { data, error } = await supabase.from('Venta').select().eq('idCliente', id);
  return data;
}

export async function getClients() {
  const { data } = await supabase.from('Cliente').select();

  console.log(data);
  return data;
}

export async function create(client) {
  const { data, error } = await supabase.from('Cliente').insert([client]);

  return false;
}

export async function login(email, password) {
  const { data, error } = await supabase
    .from('Cliente')
    .select()
    .eq('email', email)
    .eq('contrasenia', password)
    .single();
  return error ?? data;
}
