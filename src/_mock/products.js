import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { getImage, getProducts } from '../sections/@dashboard/products/DB/dbFiles';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Motorola Egde 20',
  'Samsung Galaxy Z Flip 4',
  'Redmi Note 12 Pro+ 5G',
  'Motorola Egde 30',
  'Huawei Mate 50 Pro',
  'iPhone 13',
  'Poco X4 Pro',
  'Redmi Note 12 Pro+ 5G',
  'iPhone 14',
  'Galaxy A54 5G',
  'Zenbook Pro Duo 15 OLED (UX582)',
  'Lenovo Legion 5i 6ta Gen ',
  'MacBook Pro 13 pulgadas M2',
  'Laptop HP EliteBook 840 G9',
  'Alienware M15 R',
  'ROG Zephyrus G14 (2022) GA402RK-L8163W',
  'MacBook Air M2',
  'ThinkPad T15p 2da Gen',
  'ASUS ExpertBook B1400',
  'Laptop HP Victus 15-fb0106la',
];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];
const STOCK = ['0', '5', '6', '8', '8', '5', '5', '5', '5', '5', '8', '8', '5', '5', '67', '58', '4', '58'];

// ----------------------------------------------------------------------

const products = async () => {
  const prod = await getProducts();
  console.log('p', prod);
  const result = prod.map((p, index) => {
    const setIndex = index + 1;

    return {
      id: p.idProducto,
      cover: p.url,
      name: p.nombreModelo,
      stock: p.existencia,
      price: p.precioProducto,
      priceSale: p.precioProducto,
      description: p.caracteristicas,
      colors:
        (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        PRODUCT_COLOR,
      status: sample(['sale', 'new', '', '']),
    };
  });

  return result;
};

export default products;
