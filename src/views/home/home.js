import React from 'react';
import Footer from '../../components/Footer';
import ToolbarProducts from '../../components/ToolbarProducts';
import Header from '../../components/Header';
import TableProducts from '../../components/TableProducts';
import { Grid } from '@material-ui/core';
import CentaurusApi from './../../api/api';
import moment from 'moment';

class Home extends React.Component {
  state = {
    data: [],
    Release: null,
    Dataset: null,
  };

  clearData = () => {
    this.setState({
      data: [],
    });
    return;
  };

  clearInputs = () => {
    this.setState({
      Release: null,
      Dataset: null,
    });
    return;
  };

  handleFilterSelected = async filters => {
    this.loadData(filters);
  };

  loadData = async dataSearch => {
    if (dataSearch) {
      const search = await CentaurusApi.searchSelectedFilter(dataSearch);
      const data = search.productsList.edges.map(edge => {
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
          date: moment(dateTime).format('YYYY-MM-DD'),
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
          handleFilterSelected={this.handleFilterSelected}
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
