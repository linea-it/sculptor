import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import logo from 'logo.png';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, CardMedia } from '@material-ui/core';
import { prototype } from 'node-notifier/notifiers/balloon';

const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  media: {
    height: '',
    width: '',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  grow: {
    flexGrow: 1,
  },
});

function Footer(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.grow} color="inherit">
            Developer Portal Instance
          </Typography>
          <Typography color="inherit">Powered by LineA</Typography>
        </Toolbar>
        {/* <img src={logo} /> */}
        {/* <CardMedia className={classes.media} image={Logo} title="LIneA" /> */}
      </AppBar>
    </React.Fragment>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  // logo: prototype.isRequired,
};

export default withStyles(styles)(Footer);
