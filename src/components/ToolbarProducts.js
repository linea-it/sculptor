import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import InputBase from '@material-ui/core/InputBase';
import CentaurusApi from './../api/api';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import LongMenu from './../components/clearComponents';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  select: {
    minWidth: 140,
  },
  formControl: {
    marginLeft: theme.spacing.unit * 2,
  },
  search: {
    marginLeft: theme.spacing.unit * 4,
    padding: '8px 60px',
  },
  longMenu: {
    marginLeft: theme.spacing.unit * 12,
  },
});

class ToolbarProducts extends React.Component {
  state = {
    releases: [],
    datasets: [],
    types: [],
    classesInput: [],
    searchs: [],
    bands: [],
    release: '',
    dataset: '',
    type: '',
    classesValue: '',
    releaseName: '',
    search: '',
  };

  onClearSelects = () => {
    this.setState(
      {
        band: '',
        release: '',
        dataset: '',
        type: '',
        classesValue: '',
        search: '',
      },
      () => {
        this.props.clearData();
      }
    );
  };
  componentDidMount() {
    this.loadReleases();
    this.loadType();
  }

  loadReleases = async () => {
    const dataReleases = await CentaurusApi.getRelease();
    const releases = dataReleases.releaseTagList.edges.map(edge => edge.node);
    this.setState({
      releases: releases,
    });
  };

  handleChange = () => {
    const filters = {
      release: this.state.release,
      dataset: this.state.dataset,
      type: this.state.type,
      classesValue: this.state.classesValue,
      search: this.state.search,
    };
    this.props.handleFilterSelected(filters);
  };

  onChangeRelease = event => {
    const value = event.target.value;
    this.loadDataset(value);
    this.setState(
      {
        release: value,
      },
      () => {
        this.handleChange();
      }
    );
  };

  loadDataset = async tagId => {
    const dataDataset = await CentaurusApi.getDataset(tagId);
    const datasets = dataDataset.fieldsByTagId;
    this.setState({
      datasets: datasets,
    });
  };

  onChangeDataset = event => {
    const value = event.target.value;
    this.setState(
      {
        dataset: value,
      },
      () => {
        this.handleChange();
      }
    );
  };

  loadType = async () => {
    const dataType = await CentaurusApi.getType();
    const types = dataType.productTypeList.edges.map(edge => edge.node);
    this.setState({
      types: types,
    });
  };

  onChangeType = event => {
    const type = 'type';
    const value = event.target.value;

    this.props.handleFilterSelected({ value, type });
    this.setState(
      {
        type: value,
      },
      () => this.loadClasses(value),
      () => this.handleChange()
    );
  };

  loadClasses = async () => {
    const dataClass = await CentaurusApi.getClasses();
    const productClass = dataClass.productsList.edges.map(
      edge => edge.node.Class
    );
    this.setState({
      classesInput: productClass,
    });
  };

  onChangeClasses = event => {
    const value = event.target.value;

    this.setState(
      {
        classesValue: value,
      },
      () => this.handleChange()
    );
  };

  onChangeSearch = event => {
    const search = event.target.value;
    if (!search) {
      this.setState({ search: '' });
    }
    this.setState({ search }, () => this.handleChange());
  };

  render() {
    const { classes } = this.props;
    const { releases, datasets, types, classesInput } = this.state;
    return (
      <React.Fragment>
        <Toolbar>
          <form autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="release">Release</InputLabel>
              <Select
                className={classes.select}
                value={this.state.release}
                onChange={this.onChangeRelease}
                inputProps={{
                  name: 'Release',
                  id: 'release',
                }}
              >
                <MenuItem value={0}>
                  <em>Any</em>
                </MenuItem>

                {releases.map((option, key) => (
                  <MenuItem
                    key={key}
                    value={option.tagId}
                    title={option.releaseDisplayName}
                  >
                    {option.releaseDisplayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="dataset">Dataset</InputLabel>
              <Select
                className={classes.select}
                value={this.state.dataset}
                onChange={this.onChangeDataset}
                inputProps={{
                  name: 'Dataset',
                  id: 'dataset',
                }}
                disabled={datasets.length > 0 ? false : true}
              >
                <MenuItem value={0}>
                  <em>Any</em>
                </MenuItem>

                {datasets.map((option, key) => (
                  <MenuItem key={key} value={option.fieldId}>
                    {option.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select
                className={classes.select}
                value={this.state.type}
                onChange={this.onChangeType}
                inputProps={{
                  name: 'Type',
                  id: 'type',
                }}
              >
                <MenuItem value={0}>
                  <em>Any</em>
                </MenuItem>

                {types.map((option, key) => (
                  <MenuItem key={key} value={option.typeId}>
                    {option.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="classes">Classes</InputLabel>
              <Select
                className={classes.select}
                value={this.state.classesValue}
                onChange={this.onChangeClasses}
                inputProps={{
                  name: 'Class',
                  id: 'class',
                }}
                disabled={classesInput.length > 0 ? false : true}
              >
                <MenuItem value={0}>
                  <em>Any</em>
                </MenuItem>
                {classesInput.map((option, key) => (
                  <MenuItem key={key} value={option.classId}>
                    {option.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          <InputBase
            value={this.state.search}
            onChange={this.onChangeSearch}
            placeholder="Search"
            className={classes.search}
          />
          <IconButton className={classes.iconButton} aria-label="Search">
            <Icon className={classes.icon} color="primary">
              search
            </Icon>
          </IconButton>
          <LongMenu
            onClearSelects={this.onClearSelects}
            className={classes.longMenu}
          />
        </Toolbar>
      </React.Fragment>
    );
  }
}

ToolbarProducts.propTypes = {
  classes: PropTypes.object.isRequired,

  handleSearch: PropTypes.func,
  handleFilter: PropTypes.func,
  clearData: PropTypes.func,
  handleFilterSelected: PropTypes.func.isRequired,
};

export default withStyles(styles)(ToolbarProducts);
