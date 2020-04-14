import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import '../static/default.css';

import theme from './utils/theme';

import Layout from './components/Layout';
import SEO from './components/SEO';
import Cursor, {
  MouseHoverProvider,
  CursorColorProvider,
} from './components/Cursor';

import Slides from './slides';

function App() {
  return (
    <MouseHoverProvider>
      <CursorColorProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Cursor color="pink" />
            <SEO />
            <Slides />
          </Layout>
        </ThemeProvider>
      </CursorColorProvider>
    </MouseHoverProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
