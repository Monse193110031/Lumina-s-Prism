import PropTypes from 'prop-types';
// @mui
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled, alpha} from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Drawer, Typography, Avatar, Link} from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from './NavSection';
//
import navConfig from './configNavHead';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;
const NAV_WIDTH2 = 1000;
const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));



Header.propTypes = {
  onOpenNav: PropTypes.func,
};


export default function Header({ data = [], ...other  }) {
  
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height:1},
      }}
    >
      <NavSection data={navConfig}/>
      <Box sx={{ flexGrow:0 , alignContent: 'center'}} />

    </Scrollbar>
  );
  
  return (
    <StyledRoot>
      <StyledToolbar>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
        
        <Box
        
        component="nav"
        sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH2 },
        height:'auto'
        
        }}
        >
        {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH2,
              bgcolor: 'transparent',
              height:'auto'
            },
          }}
        >
          {renderContent}
        </Drawer>
        ) : (
        <Drawer
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH2 },
          }}
        >
          {renderContent}
        </Drawer>
         )}
         </Box>
      
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
          
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------
