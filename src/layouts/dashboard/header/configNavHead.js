// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Estadísticas',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },

  {
    title: 'Acerca de nosotros',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  
];

export default navConfig;
