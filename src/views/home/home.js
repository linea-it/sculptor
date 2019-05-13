import React from 'react';
import Footer from '../../components/Footer';
import ToolbarProducts from '../../components/ToolbarProducts';
import Header from '../../components/Header';
import TableProducts from '../../components/TableProducts';
import { Grid } from '@material-ui/core';


class Home extends React.Component {
  state = {
    Release: null,
    Dataset: null,
    totalCount: 0,
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
    this.setState({
      filtros: filters
    })
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
            <TableProducts filters={this.state.filtros}/>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Home;
