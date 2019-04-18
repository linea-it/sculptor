import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Button } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import InputBase from '@material-ui/core/InputBase';
import CentaurusApi from './../api/api';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit * 2,
    padding: '3px 20px',
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
    classes: '',
    band: '',
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
        classes: '',
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

  onChangeRelease = (event) => {   
    const value = event.target.value;
    this.loadDataset(value);
    this.setState(
      {
        release: value 
      }, 
      () => {
          this.props.handleFilterSelected(event);
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

  onChangeDataset = (event) => {
    const value = event.target.value;
    this.setState(
      {
        dataset: value 
      }, 
      () => {
          this.props.handleFilterSelected(event);
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
    this.loadClasses(value);
    this.props.handleFilterSelected({value, type});
    this.setState(
      {
        type: value,
      },
      () => {
        this.loadType();
      }
    );
  };

  loadClasses = async () => {
    const dataClass = await CentaurusApi.getClasses();
    const productClass = dataClass.productClassList.edges.map(
      edge => edge.node
    );
    this.setState({
      classesInput: productClass,
    });
  };

  onChangeClasses = event => {
    const value = event.target.value;
    this.props.handleFilterSelected(value);
    this.setState(
      {
        classes: value,
      },
      () => {
        this.loadClasses();
      }
    );
  };


  // loadBand = async () => {
  //   const data = await CentaurusApi.getBand();
  //   console.log(data);
  //   const bands = data.filtersList.edges.map(edge => edge.node.filter);
  //   this.setState({
  //     bands: bands,
  //   });
  // }

  // onChangeBand = event => {
  //   const value = event.target.value;
  //   this.setState(
  //     { 
  //       band: value 
  //     },
  //     () => {
  //        this.props.handleFilterSelectedBand(value)
  //     }     
  //   );
  // };
  
  onChangeSearch = event => {
    const search = event.target.value;
    this.setState({ search: search });
    this.props.handleFilterSelected(search);
  };


  render() {
    console.log('DataSet', this.state.dataset);
    console.log('Release', this.state.release);
    const { classes } = this.props;
    const { releases, datasets, types, classesInput, bands } = this.state;
    return (
      <React.Fragment>
        <Toolbar>
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
              <MenuItem value="">
                <em>Any</em>
              </MenuItem>

              {releases.map((option, key) => (
                <MenuItem key={key} value={option.tagId}>
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
              <MenuItem value="">
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
              <MenuItem value="">
                <em>Type</em>
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
              value={this.state.classes}
              onChange={this.onChangeClass}
              inputProps={{
                name: 'Class',
                id: 'class',
              }}
              disabled={classesInput.length > 0 ? false : true}
            >
              <MenuItem value="">
                <em>Class</em>
              </MenuItem>

              {classesInput.map((option, key) => (
                <MenuItem key={key} value={option.classId}>
                  {option.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl className={classes.formControl}>
            <InputLabel htmlFor="band">Band</InputLabel>
            <Select
              className={classes.select}
              value={this.state.band}
              onChange={this.onChangeBand}
              inputProps={{
                name: 'Band',
                id: 'Band',
              }}
            >
              <MenuItem value="">
                <em>Band</em>
              </MenuItem>

              {bands.map((option, key) => (
                <MenuItem key={key} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.onClearSelects}
          >
            Clear Filter
          </Button>
          <InputBase
            value={this.state.search}
            onChange={this.onChangeSearch}
            placeholder="Search"
          />
          <IconButton className={classes.iconButton} aria-label="Search">
            <Icon className={classes.icon} color="primary">
              search
            </Icon>
          </IconButton>
        </Toolbar>
      </React.Fragment>
    );
  }
}

ToolbarProducts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolbarProducts);
