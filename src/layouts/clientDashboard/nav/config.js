// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Productos',
    path: '/clients/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Compras',
    path: '/clients/history',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
