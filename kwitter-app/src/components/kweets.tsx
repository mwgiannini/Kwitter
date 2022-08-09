import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Kweet from './kweet'

export default function Kweets() {

  return (
      <Paper sx={{
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      >
          <Kweet></Kweet>
      </Paper>
  );
}