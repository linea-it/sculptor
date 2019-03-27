import React from 'react';
import Footer from '../../components/Footer';
import ToolbarProducts from '../../components/ToolbarProducts';
import Header from '../../components/Header';
import TableDX from '../../components/TableDX';
import { Grid } from '@material-ui/core';
import CentaurusApi from './../../api/api';

// const API_URL =
//   process.env.NODE_ENV === 'production'
//     ? window._env_.REACT_APP_API_URL
//     : process.env.REACT_APP_API_URL;

class Home extends React.Component {
  state = {
    data: [],
  };

  handleSearch = ({ search, releaseName }) => {
    this.loadData({ search, releaseName });
  };

  loadData = async ({ search, releaseName }) => {
    const dataSearch = await CentaurusApi.getSearch({
      search,
      releaseName,
    });
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
        };
      });

      if (data) {
        this.setState({
          data: data,
        });
      } else {
        this.setState({
          data: '',
        });
      }
    }
  };

  render() {
    return (
      <div>
        <Header />
        <ToolbarProducts
          handleSearch={this.handleSearch}
          handleFilter={this.handleFilter}
        />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <TableDX data={this.state.data} />
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Home;
