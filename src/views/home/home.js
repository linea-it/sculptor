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

  handleFilterSelected = async ev => {
    console.log('HandleFilterSelected:', ev);

    if(ev.target.name == 'Release'){
      this.setState({
        Release: ev.target.value,
      }, () => 
        this.loadData(ev.target.value)
      );  
    }

    if (ev.target.name == 'Dataset') {
      this.setState({
        Dataset: ev.target.value,
      }, () => 
        this.loadData(ev.target.value)
      );
    }

    this.setState({
      inputs: ev.target.name,
    });

    // ev ? this.loadData(ev.target.value) : this.clearData();
  };

  loadData = async dataSearch => {
    this.clearInputs();
    console.log('LoadData:', dataSearch);
    if (dataSearch) {
      const search = await CentaurusApi.identifyID(dataSearch);
      console.log('search for data:', search)
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
        
        // const band = edge.node.table.map.filter;
        //const bandName = null;
        // if ((band.length > 0) || band === null) {
        //   bandName = '-';
        // } else {
        //   bandName = band;
        // }
        // console.log('band', band);
        return {
          displayName: edge.node.displayName,
          dataType: edge.node.dataType,
          processId: edge.node.processId,
          releaseDisplayName: fieldname,
          field: field,
          Class: edge.node.Class.displayName,
          owner: owner.user.userName,
          date: dateTime,
          // band: band,
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
