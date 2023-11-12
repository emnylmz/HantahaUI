import React from 'react';
import Navbar from '../../components/user/navbar';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Grid } from '@mui/material';

function Layout() {
  useEffect(() => {
  }, []);

  return (
    <div id="userLayout">
      <Navbar></Navbar>
      <Grid style={{marginTop:"15px"}} container spacing={2}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Outlet />
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </div>
  );
}

export default Layout;
