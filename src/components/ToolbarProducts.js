import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Toolbar, Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 120,
    color: theme.palette.primary.contrastText,
  },
  dense: {
    marginTop: 16,
  },
  appBar: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  paper: {
    margin: 15,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit * 2,
    padding: '3px 20px',
  },
  search: {
    marginLeft: theme.spacing.unit * 3,
    padding: '8px 60px',
  },
});

const currencies = [
  {
    value: '',
    label: '',
  },
  {
    value: '',
    label: '',
  },
  {
    value: '',
    label: '',
  },
  {
    value: '',
    label: '',
  },
];

class ToolbarProducts extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <AppBar className={classes.appBar} position="relative">
          <Toolbar classesName={classes.toolbar}>
            <form className={classes.container} noValidate autoComplete="off">
              <Grid xl={12}>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Release"
                  className={classes.textField}
                  value={this.state.currency}
                  onChange={this.handleChange('currency')}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Dataset"
                  className={classes.textField}
                  value={this.state.currency}
                  onChange={this.handleChange('currency')}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Type"
                  className={classes.textField}
                  value={this.state.currency}
                  onChange={this.handleChange('currency')}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Class"
                  className={classes.textField}
                  value={this.state.currency}
                  onChange={this.handleChange('currency')}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <TextField
                  id="standard-select-currency-native"
                  select
                  label="Band"
                  className={classes.textField}
                  value={this.state.currency}
                  onChange={this.handleChange('currency')}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {currencies.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </form>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Clear Filter
            </Button>
            <InputBase placeholder="Search" />
            <IconButton className={classes.iconButton} aria-label="Search">
              <Icon className={classes.icon} color="primary">
                search
              </Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

ToolbarProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolbarProducts);
