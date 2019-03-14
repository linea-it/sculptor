import React from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  render() {
    const classes = this.props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          {/* <Paper classes={classes.content}> */}
          <Grid
            rows={[
              {
                release: 2221,
                dataset: 'DevExtreme',
                type: 'lorem',
                class: 'ipsum',
                productName: 'eadas',
                proctType: 'fsfs',
                processID: '39242',
                owner: 'DevExpress',
                band: 'i',
                date: '21/21/2112',
              },
              { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
            ]}
            columns={[
              { name: 'release', title: 'Release' },
              { name: 'dataset', title: 'Dataset' },
              { name: 'type', title: 'Type' },
              { name: 'class', title: 'Class' },
              { name: 'productName', title: 'Product Name' },
              { name: 'productType', title: 'Product Type' },
              { name: 'processID', title: 'Process ID' },
              { name: 'owner', title: 'Owner' },
              { name: 'band', title: 'Band' },
              { name: 'date', title: 'Date' },
            ]}
          >
            <Table />
            <TableHeaderRow />
          </Grid>
        </Card>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TableDX);
