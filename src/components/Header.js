import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import logo from 'logo.png';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../assets/img/icon-des.png';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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
});

function Header(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <img src={logo} />
            </IconButton>
            <Typography classesName={classes.grow} variant="h6" color="inherit">
              Science Products
            </Typography>
            {/* AppBar API: {API_URL} */}
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  // logo: prototype.isRequired,
};

export default withStyles(styles)(Header);
