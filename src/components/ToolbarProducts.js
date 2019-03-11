import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Toolbar, Button } from '@material-ui/core';
// import { Toolbar } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    padding: '6px 50px',
  },
});

const namesInputs = [
  { name: 'release' },
  { name: 'dataset' },
  { name: 'type' },
  { name: 'class' },
  { name: 'band' },
];

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
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
      // <Toolbar>
      (
        <div>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="filled-select-currency-native"
              select
              label="release"
              className={classes.textField}
              value={this.state.currency}
              onChange={this.handleChange('currency')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your currency"
              margin="normal"
              variant="filled"
            >
              {currencies.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="filled-select-currency-native"
              select
              label="dataset"
              className={classes.textField}
              value={this.state.currency}
              onChange={this.handleChange('currency')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your currency"
              margin="normal"
              variant="filled"
            >
              {currencies.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="filled-select-currency-native"
              select
              label="type"
              className={classes.textField}
              value={this.state.currency}
              onChange={this.handleChange('currency')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your currency"
              margin="normal"
              variant="filled"
            >
              {currencies.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="filled-select-currency-native"
              select
              label="class"
              className={classes.textField}
              value={this.state.currency}
              onChange={this.handleChange('currency')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your currency"
              margin="normal"
              variant="filled"
            >
              {currencies.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              id="filled-select-currency-native"
              select
              label="class"
              className={classes.textField}
              value={this.state.currency}
              onChange={this.handleChange('currency')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select your currency"
              margin="normal"
              variant="filled"
            >
              {currencies.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </form>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            className={classes.button}
          >
            Secondary
          </Button>
        </div>
      ),
      {
        /* </Toolbar> */
      }
    );
  }
}

ToolbarProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolbarProducts);
