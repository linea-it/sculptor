import React from 'react';
import Footer from '../../components/Footer';
import ToolbarProducts from '../../components/ToolbarProducts';
import Header from '../../components/Header';
import TableProducts from '../../components/TableProducts';
import { Grid } from '@material-ui/core';
import CentaurusApi from './../../api/api';

class Home extends React.Component {
  state = {
    data: [],
  };

  clearData = () => {
    this.setState({
      data: [],
    });
    return;
  };

  handleSearch = search => {
    if (search) {
      const id = 'search';
      this.loadData({ search, id });
    } else {
      this.clearData();
    }
  };

  handleFilter = (filter, displayName) => {
    if (filter) {
      const id = 'filter';
      this.loadData({ filter, id, displayName });
    } else {
      this.clearData();
    }
  };

  loadData = async value => {
    this.clearData();
    const dataSearch = await CentaurusApi.searchProductsAllFilters(value);
    if (dataSearch) {
      const data = dataSearch.productsList.edges.map(edge => {
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
          dataType: edge.node.dataType,
          processId: edge.node.processId,
          releaseDisplayName: fieldname,
          field: field,
          Class: edge.node.Class.displayName,
          owner: owner.user.userName,
          date: dateTime,
          productLog: edge.node.process.productLog,
          daCHs: edge.node.table.dachsUrl,
        };
      });
      this.setState({
        data: data,
      });
    }
  };

  render() {
    return (
      <div>
        <Header />
        <ToolbarProducts
          handleSearch={this.handleSearch}
          handleFilter={this.handleFilter}
          clearData={this.clearData}
        />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <TableProducts rows={this.state.data} />
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Home;
