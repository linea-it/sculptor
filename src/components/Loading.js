import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = theme => ({
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, .3)',
  },

  loadingIcon: {
    position: 'absolute',
    fontSize: '20px',
    top: 'calc(45% - 10px)',
    left: '2calc(50% - 10px)',
  },
});

const Loading = () => (
  <div className="loading">
    <CircularProgress className="loadingIcon" />
  </div>
);

export default withStyles(style)(Loading);
