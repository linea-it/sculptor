// import React from 'react';
// import {
//   Grid,
//   Table,
//   PagingPanel,
//   TableHeaderRow,
// } from '@devexpress/dx-react-grid-material-ui';
// import Card from '@material-ui/core/Card';
// import { withStyles } from '@material-ui/core/styles';
// import { PagingState, IntegratedPaging , CustomPaging }  from '@devexpress/dx-react-grid';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import CentaurusApi from './../api/api';
// import moment from 'moment';
// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   card: {
//     margin: 40,
//   },
//   content: {
//     margin: 50,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

// class TableProducts extends React.Component {
//   state = {
//     loading: false,
//     totalCount: 0,
//     pageSize: 2,
//     currentPage: 1,
//     pageSizes: [2, 4, 6],
//     after: '',
//     cursor: ''
//   };

//   componentDidUpdate(prevProps) {

//     if (this.props !== prevProps){
//       this.loadData();
//     }
//   }

//   changeCurrentPage = (currentPage) => {
//     console.log("changeCurrentPage: ", currentPage)
//     this.setState({
//       currentPage: currentPage,
//     }, () => this.loadData());
//   };

//   changePageSize = pageSize => {
//     const { totalCount, currentPage: stateCurrentPage } = this.state;
//     const totalPages = Math.ceil(totalCount / pageSize);
//     const currentPage = Math.min(stateCurrentPage, totalPages - 1);
//     console.log("Total Count", totalPages);
//     this.setState(
//       {
//         pageSize,
//         currentPage,
//       },
//       () => this.loadData(),
//       );
//   };

//   loadData = async ()  => {

//     const dataSearch = this.props.filters;
//     let {cursor, pageSize, currentPage} = this.state;

//     console.log("--------------------------")
//     console.log("Cursor", cursor);
//     console.log("After", window.atob(cursor));
//     console.log("pagesize", pageSize);
//     console.log("currentPage", currentPage);
//     // console.log("dataSearch", dataSearch);
//     console.log("--------------------------")    

//     if (dataSearch) {

//       const search = await CentaurusApi.searchSelectedFilter(dataSearch, pageSize);
//       const data = search.productsList.edges.map(edge => {
//         const fields = edge.node.process.fields.edges;
//         let fieldname = null;
//         if (fields.length > 0) {
//           fieldname = fields[0].node.releaseTag.releaseDisplayName;
//         }
//         const dataset = edge.node.process.fields.edges;
//         let field = null;
//         if (dataset.length > 0) {
//           field = fields[0].node.displayName;
//         }
//         const owner = edge.node.process.session;
//         const dateTime = edge.node.process.startTime;
        
//         return {
//           displayName: edge.node.displayName,
//           productType: edge.node.Class.productType.typeName,
//           processId: edge.node.processId,
//           releaseDisplayName: fieldname,
//           dataType: edge.node.dataType,
//           field: field,
//           Class: edge.node.Class.displayName,
//           owner: owner.user.userName,
//           date: moment(dateTime).format("YYYY-MM-DD"),
//         };
//       });

//       const last = search.productsList.edges[search.productsList.edges.length - 1];

//       this.setState({
//         data: data,
//         cursor: last.cursor,
//         totalCount: search.productsList.totalCount
//       });
//     }
//   };

//   render() {
//     // const data = this.props;
//     const { loading, data, totalCount, currentPage, pageSize } = this.state;

//     return (
//       <React.Fragment>
//         <Card>
//           <Grid
//             rows={
//               data
//                 ? data.map(el => {
//                     return el;
//                   })
//                 : []
//             }
//             columns={[
//               { name: 'releaseDisplayName', title: 'Release' },
//               { name: 'field', title: 'Dataset' },
//               { name: 'productType', title: 'Product Type' },
//               { name: 'Class', title: 'Class' },
//               { name: 'displayName', title: 'Product Name' },
//               { name: 'dataType', title: 'Type' },
//               { name: 'processId', title: 'Process ID' },
//               { name: 'owner', title: 'Owner' },
//               { name: 'band', title: 'Band' },
//               { name: 'date', title: 'Date' },
//             ]}
//           >
//             <PagingState
//               currentPage={currentPage}
//               onCurrentPageChange={this.changeCurrentPage}
//               pageSize={pageSize}
//               onPageSizeChange={this.changePageSize}
//             />
//             <IntegratedPaging />
//             <CustomPaging totalCount={totalCount} />
//             <Table />
//             <TableHeaderRow />
//             <PagingPanel
//             pageSizes={this.state.pageSizes}
//             />         
//           </Grid>
//           {/* {loading && <CircularProgress
//            style = {
//               {
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 margin: '-30px 0 0 -20px',
//                 zIndex: '99',
//               }
//             }
//         />} */}
//         </Card>
//       </React.Fragment>
//     );
//   }
// }

// export default withStyles(styles)(TableProducts);
