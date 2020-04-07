import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import '../static/default.css';

import theme from './utils/theme';

import Layout from './components/Layout';
import SEO from './components/SEO';
import Cursor, { MouseHoverProvider } from './components/Cursor';
import Button from './components/Button';

function App() {
  return (
    <MouseHoverProvider>
      <ThemeProvider theme={theme}>
        <Layout isCenter>
          <SEO />
          <Cursor />
          <Button />
        </Layout>
      </ThemeProvider>
    </MouseHoverProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
