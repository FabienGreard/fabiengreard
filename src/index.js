import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import '../static/default.css';

import theme from './utils/theme';

import Layout from './components/Layout';
import Typography from './components/Typography';
import SEO from './components/SEO';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout isCenter>
        <SEO />
        <Typography variant="title">Hello World !</Typography>
      </Layout>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
