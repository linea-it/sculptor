import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../components/Footer';
import ToolbarProducts from '../../components/ToolbarProducts';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../components/Header';
import TableProducts from '../../components/TableProducts';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import CentaurusApi from './../../api/api';

const styles = {
  wrap: {
    position: 'relative',
  },
  table: {
    paddingBottom: '100px',
  },
};

class Home extends React.Component {
  state = {
    Release: null,
    Dataset: null,
    totalCount: 0,
    filters: {},
  };

  clearData = () => {
    this.setState({
      filters: {},
    });
  };

  clearInputs = () => {
    this.setState({
      Release: null,
      Dataset: null,
    });
    return;
  };

  handleFilter = (filter, displayName) => {
    if (filter) {
      const id = 'filter';
      this.loadData({ filter, id, displayName });
    } else {
      this.clearData();
    }
  };

  handleFilterSelected = async filters => {
    this.setState({
      filters: filters,
    });
    this.loadData(filters);
  };

  loadData = async dataSearch => {
    if (dataSearch) {
      const search = await CentaurusApi.searchSelectedFilter(dataSearch);
      const data = search
        ? search.productsList.edges.map(edge => {
            const fields = edge.node.process.fields.edges;
            let fieldname = null;
            if (fields.length > 0) {
              fieldname = fields[0].node.releaseTag.releaseDisplayName;
            }
            const dataset = edge.node.process.fields.edges;
            let field = null;
            if (dataset.length > 0) {
              field = fields[0].node.displayName;
            }
            const owner = edge.node.process.session;
            const dateTime = edge.node.process.startTime;

            return {
              displayName: edge.node.displayName,
              productType: edge.node.Class.productType.typeName,
              processId: edge.node.processId,
              releaseDisplayName: fieldname,
              dataType: edge.node.dataType,
              field: field,
              Class: edge.node.Class.displayName,
              owner: owner.user.userName,
              productLog: edge.node.process.productLog,
              daCHs: edge.node.table ? edge.node.table.dachsUrl : '',
              date: moment(dateTime).format('YYYY-MM-DD'),
            };
          })
        : [];
      this.setState({
        data: data,
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrap}>
        <Header />
        <div className={classes.table}>
          <ToolbarProducts
            handleFilterSelected={this.handleFilterSelected}
            clearData={this.clearData}
          />
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TableProducts filters={this.state.filters} />
            </Grid>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
