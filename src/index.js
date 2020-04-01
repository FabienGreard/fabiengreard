import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import '../static/default.css';

import theme from './utils/theme';

import Layout from './components/Layout';
import SEO from './components/SEO';
import Cursor, {
  MouseHoverProvider,
  MouseHoverContext,
} from './components/Cursor';

const ButtonStyle = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 50px;
  cursor: none;
`;

const Button = () => {
  const { toggleIsHover } = useContext(MouseHoverContext);

  return (
    <ButtonStyle onMouseEnter={toggleIsHover} onMouseLeave={toggleIsHover}>
      Click Me
    </ButtonStyle>
  );
};

function App() {
  return (
    <MouseHoverProvider>
      <ThemeProvider theme={theme}>
        <Layout isCenter>
          <SEO />
          <Cursor color="blue" />
          <Button />
        </Layout>
      </ThemeProvider>
    </MouseHoverProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
