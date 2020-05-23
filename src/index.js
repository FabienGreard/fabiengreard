import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import '../static/default.css';

import theme from './utils/theme';

import Layout from './components/Layout';
import Cursor, {
  MouseHoverProvider,
  CursorColorProvider,
} from './components/Cursor';

import Slides from './slides';
import useMedia from './utils/useMedia';
import { DEVICES } from './utils/theme';

function App() {
  const media = useMedia();

  return (
    <MouseHoverProvider>
      <CursorColorProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            {media >= DEVICES.laptop && <Cursor color="pink" />}
            <Slides />
          </Layout>
        </ThemeProvider>
      </CursorColorProvider>
    </MouseHoverProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
