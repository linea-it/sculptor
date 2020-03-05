import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/img/icon-des.png';
import { Typography, IconButton, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  media: {
    height: '',
    width: '',
  },
  grow: {
    flexGrow: 1,
  },
  separatorToolBar: {
    flexGrow: 1,
  },
});

const homeUrl =
process.env.NODE_ENV === 'production'
  ? window._env_.REACT_APP_HOME_URL
  : process.env.REACT_APP_HOME_URL;

function Header(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton href={homeUrl} color="inherit" aria-label="Menu">
              <img alt="logo DES" src={logo} />
            </IconButton>
            <Typography className={classes.grow} variant="h6" color="inherit">
              Science Products
            </Typography>
            <div className={classes.separatorToolBar} />
            <Button
                color="inherit"
                size="large"
                href={homeUrl}
            >
              <HomeIcon /> 
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
