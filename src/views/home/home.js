import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Inline from '../../components/inline-style';
import Footer from '../../components/Footer';
import IconButton from '@material-ui/core/IconButton';
import ToolbarProducts from '../../components/ToolbarProducts';
import { Toolbar } from '@material-ui/core';
import logo from '../../assets/img/icon-des.png';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? window._env_.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL;

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <IconButton color="inherit" aria-label="Menu">
              <img src={logo} />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Science Products
            </Typography>
            {/* AppBar API: {API_URL} */}
          </Typography>
        </Toolbar>
      </AppBar>

      <ToolbarProducts />

      <Footer />
    </div>
  );
}

export default App;
