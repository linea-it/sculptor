import PropTypes from "prop-types";
import React from "react";
import {
  Grid,
  Table,
  PagingPanel,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import {
  PagingState,
  IntegratedPaging,
  EditingState
} from "@devexpress/dx-react-grid";
import Card from "@material-ui/core/Card";
import { ButtonBase } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { isEmpty, isUndefined } from "lodash";

class TableProducts extends React.Component {
  style = {
    loading: true
  };

  iconLog = value => {
    if (isEmpty(value) || isUndefined(value)) {
      return <span> - </span>;
    } else {
      return (
        <div>
          <ButtonBase
            onClick={() => {
              window.open(value);
            }}
          >
            <Icon>link</Icon>
          </ButtonBase>
        </div>
      );
    }
  };

  iconStorage = value => {
    if (isEmpty(value) || isUndefined(value)) {
      return <span> - </span>;
    } else {
      return (
        <div>
          <ButtonBase
            onClick={() => {
              window.open(value);
            }}
          >
            <Icon>storage</Icon>
          </ButtonBase>
        </div>
      );
    }
  };

  render() {
    const { rows } = this.props;

    rows.map(el => { 
        el.log = this.iconLog(el.productLog);
        el.storage = this.iconStorage(el.daCHs);
        return null;
    });

    return (
      <React.Fragment>
        <Card>
          <Grid
            rows={rows}
            columns={[
              { name: "releaseDisplayName", title: "Release" },
              { name: "field", title: "Dataset" },
              { name: "dataType", title: "Type" },
              { name: "Class", title: "Class" },
              { name: "displayName", title: "Product Name" },
              { name: "productType", title: "Product Type" },
              { name: "processId", title: "Process ID" },
              { name: "owner", title: "Owner" },
              { name: "band", title: "Band" },
              { name: "date", title: "Date" },
              { name: "log", title: "Log" },
              { name: "storage", title: "Storage" }
            ]}
          >
            <EditingState />
            <PagingState defaultCurrentPage={0} pageSize={2} />
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

TableProducts.propTypes = {
  rows: PropTypes.array.isRequired
};
export default TableProducts;
