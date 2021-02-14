import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

// normalize.css
import(/* webpackPreload: true */ /* webpackChunkName: 'normalize' */ '../static/default.css');

import theme from './utils/theme';

import Layout from './components/Layout';
import Cursor, { MouseHoverProvider, CursorColorProvider } from './components/Cursor';

import Slides from './slides';
import useMedia from './utils/useMedia';
import { DEVICES } from './utils/theme';
import { socials } from './utils/constants';

function App() {
  const media = useMedia();

  useEffect(() => {
    console.log(
      `%c Hey 👋, you may be interested in the code : ${socials.github}/fabiengreard.git`,
      'font-size: 16px; color: #111',
    );
  }, []);

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
