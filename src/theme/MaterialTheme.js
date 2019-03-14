import { createMuiTheme } from '@material-ui/core/styles';
// import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';

// const primary = grey[900];
// const secondary = grey[50];
// const textPrimary = grey[50];
// const textSecondary = grey[900];

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5c6b7d',
      main: '#34465d',
      dark: '#243141',
      contrastText: '#fff',
    },
    secondary: pink,
  },
  typography: {
    useNextVariants: true,
  },
});
//   palette: {
//     primary: {
//       main: primary,
//       light: '#7986cb',
//       dark: '#303f9f',
//       contrastText: '#fff',
//     },
//     secondary: { main: secondary },
//     textPrimary: { main: textPrimary },
//     textSecondary: textSecondary,
//     background: primary,
//   },
//   typography: {
//     fontSize: 16,
//   },
// });

export default theme;
