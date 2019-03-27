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
    bands: '',
    release: '',
    dataset: '',
    type: '',
    class: '',
    band: '',
    releaseName: '',

    searchs: [],
  };

  onClearSelects = () => {
    this.setState({
      band: '',
      release: '',
      dataset: '',
      type: '',
      class: '',
    });
  };
  componentDidMount() {
    this.loadReleases();
    this.loadType();
  }

  loadReleases = async () => {
    const dataReleases = await CentaurusApi.getAllrelease();
    const releases = dataReleases.releaseTagList.edges.map(edge => edge.node);
    this.setState({
      releases: releases,
    });
  };

  handleChangeRelease = async event => {
    const release = event.target.value;

    const dataReleases = await CentaurusApi.getAllrelease();
    const releaseName = dataReleases.releaseTagList.edges.map(
      edge => edge.node
    );
    const releaseNamePop = releaseName.pop();
    const name = releaseNamePop.name;
    const tagId = releaseNamePop.tagId;

    if (release) {
      if (release === tagId) {
        this.setState(
          {
            releaseName: name,
            release: release,
          },
          () => {
            this.props.handleSearch({
              search: '',
              releaseName: name,
            });
            this.loadDataset(release);
          }
        );
      }
    } else {
      this.setState(
        {
          releaseName: name,
          release: release,
          dataset: '',
        },

        () => {
          this.props.handleSearch({
            search: '',
            releaseName: name,
          });
        }
      );
    }
  };

  handleChangeSearch = event => {
    const search = event.target.value;
    this.props.handleSearch({ search: search, releaseName: '', fieldName: '' });
  };

  loadDataset = async tagId => {
    const dDataset = await CentaurusApi.getDataset(tagId);
    const datasets = dDataset.fieldsByTagId;
    this.setState({
      datasets: datasets,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeDataset = event => {
    const dataset = event.target.value;
    if (this.state.release !== '') {
      this.setState(
        {
          dataset: dataset,
        },
        () => {
          this.props.handleSearch({
            search: '',
            releaseName: '',
            fieldName: dataset,
          });
        }
      );
    }
  };

  loadClass = async () => {
    const dataClass = await CentaurusApi.getAllClass();
    const productClass = dataClass.productClassList.edges.map(
      edge => edge.node
    );
    this.setState({
      classesInput: productClass,
    });
  };

  handleChangeClass = event => {
    const classe = event.target.value;

    this.setState({
      class: classe,
    });
  };

  loadType = async () => {
    const dataType = await CentaurusApi.getAllType();
    const productType = dataType.productTypeList.edges.map(edge => edge.node);
    this.setState({
      types: productType,
    });
  };

  handleChangeType = event => {
    const type = event.target.value;

    this.setState(
      {
        type: type,
      },
      () => {
        this.loadClass();
      }
    );
  };

  render() {
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
              onChange={this.handleChangeRelease}
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
              onChange={this.handleChangeDataset}
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
            <InputLabel htmlFor="dataset">Type</InputLabel>
            <Select
              className={classes.select}
              value={this.state.type}
              onChange={this.handleChangeType}
              inputProps={{
                name: 'Type',
                id: 'type',
              }}
              disabled={classesInput.length > 0 ? false : true}
            >
              <MenuItem value="">
                <em>Type</em>
              </MenuItem>

              {types.map((option, key) => (
                <MenuItem key={key} value={option.typeName}>
                  {option.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="classes">Classes</InputLabel>
            <Select
              className={classes.select}
              value={this.state.class}
              onChange={this.handleChangeClass}
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
                <MenuItem key={key} value={option.displayName}>
                  {option.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="band">Band</InputLabel>
            <Select
              className={classes.select}
              value={this.state.band}
              onChange={this.handleChangeDataset}
              inputProps={{
                name: 'Band',
                id: 'Band',
              }}
              disabled={bands.length > 0 ? false : true}
            >
              <MenuItem value="">
                <em>Band</em>
              </MenuItem>

              {datasets.map((option, key) => (
                <MenuItem key={key} value={option.fieldId}>
                  {option.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.onClearSelects}
          >
            Clear Filter
          </Button>
          <InputBase onChange={this.handleChangeSearch} placeholder="Search" />
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
