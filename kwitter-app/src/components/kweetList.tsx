import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Kweet from './kweet/kweet';
import Rekweet from './kweet/rekweet'


const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function KweetList(props : any) {
  return (
    <React.Fragment>
      <CssBaseline />
        <List sx={{ mb: 2 }}>
          {props.list.map((val:any, index:number) => (
            <React.Fragment key={index}>
              <ListItem sx={{ justifyContent: 'center'}}>
                {'op' in val ?
                  <Rekweet username={val.username} message={val.message} 
                  post_time={val.post_time} rekweet_time={val.rekweet_time} 
                  op={val.op}/>
                  :
                  <Kweet username={val.username} message={val.message} 
                  post_time={val.post_time}/>
                }
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      {/* <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <StyledFab color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}
    </React.Fragment>
  );
}