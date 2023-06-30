// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Productos',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Usuarios',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  
];

export default navConfig;
