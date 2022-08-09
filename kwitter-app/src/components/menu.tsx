import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';

export default function MainMenu(props: any) {
  const [state, setState] = React.useState(false);
  const navigate = useNavigate()


  const handleMenuItems = (nav: string) => {
    navigate(nav, {replace: true})
  };

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState(open);
      };


  return (
    <div>
      {
        <React.Fragment>
          <Button onClick={toggleDrawer(true)}> <MenuIcon color='action' /></Button>
          <Drawer
            open={state}
            onClose={toggleDrawer(false)}
          >
            <List onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}>
              <ListItem>
                <ListItemButton onClick={() => handleMenuItems('/userTable')}>
                  <ListItemIcon><GroupIcon /></ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => handleMenuItems('/devicePage')}>
                  <ListItemIcon><DevicesOtherIcon /></ListItemIcon>
                  <ListItemText primary="Devices" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </React.Fragment>
      }
    </div >
  );
}