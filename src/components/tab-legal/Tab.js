import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Terminos from './Terminos';
import Aviso from './Aviso';
import Politica from './Politica';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.default', display: 'flex', height:'auto' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', bgcolor:'background.default', display:'flex', justifyItems:'space-between' }}
      >
        <Tab label="Términos y condiciones" {...a11yProps(0)} />
        <Tab label="Política de reembolso y garantía" {...a11yProps(1)} />
        <Tab label="Aviso de privacidad" {...a11yProps(2)} />
        
      </Tabs>
      <TabPanel value={value} index={0}>
        <Terminos/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Politica/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Aviso/>
      </TabPanel>
    </Box>
  );
}