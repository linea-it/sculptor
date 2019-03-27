import React from 'react';
import {
  Grid,
  Table,
  PagingPanel,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import { PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  card: {
    margin: 40,
  },
  content: {
    margin: 50,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class TableDX extends React.Component {
  style = {
    loading: true,
  };

  render() {
    const classes = this.props;
    const data = this.props;
    return (
      <React.Fragment>
        <Card>
          <Grid
            rows={data.data.map(el => {
              return el;
            })}
            columns={[
              { name: 'releaseDisplayName', title: 'Release' },
              { name: 'field', title: 'Dataset' },
              { name: 'dataType', title: 'Type' },
              { name: 'Class', title: 'Class' },
              { name: 'displayName', title: 'Product Name' },
              { name: 'productType', title: 'Product Type' },
              { name: 'processId', title: 'Process ID' },
              { name: 'owner', title: 'Owner' },
              { name: 'band', title: 'Band' },
              { name: 'date', title: 'Date' },
            ]}
          >
            <PagingState defaultCurrentPage={0} pageSize={5} />
            <IntegratedPaging />
            <Table />
            <TableHeaderRow />
            <PagingPanel />
          </Grid>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TableDX);
