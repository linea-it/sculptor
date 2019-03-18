import React from 'react';
import Footer from '../../components/Footer';
import ToolbarProducts from '../../components/ToolbarProducts';
import Header from '../../components/Header';
import TableDX from '../../components/TableDX';
import { Grid } from '@material-ui/core';

// const API_URL =
//   process.env.NODE_ENV === 'production'
//     ? window._env_.REACT_APP_API_URL
//     : process.env.REACT_APP_API_URL;

function App() {
  return (
    <div>
      <Header />
      <ToolbarProducts />
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <TableDX />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}

export default App;
