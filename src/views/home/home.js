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

  handleRelease = async value => {
    const dataSearch = await CentaurusApi.searchRelease(value);
    if (dataSearch) {
      this.loadData(dataSearch);
    } else {
      this.clearData();
    }
  };
  handleDataSet = async value => {
    const dataSearch = await CentaurusApi.searchDataset(value);
    if (dataSearch) {
      this.loadData(dataSearch);
    } else {
      this.clearData();
    }
  };

  handleType =  async value => {
    const dataSearch = await CentaurusApi.searchType(value);
    if (dataSearch) {
      this.loadData(dataSearch);
    } else {
      this.clearData();
    }
  };

  handleClasses =  async value => {
    const dataSearch = await CentaurusApi.searchClasses(value);
    if (dataSearch) {
      this.loadData(dataSearch);
    } else {
      this.clearData();
    }
  };

  handleBand =  async value => {
    const dataSearch = await CentaurusApi.searchBand(value);
    if (dataSearch) {
      this.loadData(dataSearch);
    } else {
      this.clearData();
    }
  };

  handleSearch = async value => {
    const dataSearch = await CentaurusApi.searchInput(value);
    if (dataSearch) {
      this.loadData(dataSearch);
    } else {
      this.clearData();
    }
  };

  loadData = dataSearch => {
    this.clearData();
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
        
        const band = edge.node.table.map.filter;
        //const bandName = null;
        // if ((band.length > 0) || band === null) {
        //   bandName = '-';
        // } else {
        //   bandName = band;
        // }
        console.log('band', band);
        return {
          displayName: edge.node.displayName,
          dataType: edge.node.dataType,
          processId: edge.node.processId,
          releaseDisplayName: fieldname,
          field: field,
          Class: edge.node.Class.displayName,
          owner: owner.user.userName,
          date: dateTime,
          band: 'r',
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
          handleRelease={this.handleRelease}
          handleDataset={this.handleDataSet}
          handleType={this.handleType}
          handleClasses={this.handleClasses}
          handleBand={this.handleBand}
          handleSearch={this.handleSearch}
          clearData={this.clearData}
        />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <TableProducts data={this.state.data} />
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Home;
