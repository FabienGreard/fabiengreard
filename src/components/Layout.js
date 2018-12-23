import React from 'react';
import { Link } from 'gatsby';

import { rhythm, scale } from '../utils/typography';
import icon from '../assets/icon.png';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;
    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <NavRoot title={title} />
        </h3>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children}
      </div>
    );
  }
}

const NavRoot = ({ title }) => (
  <div
    style={{
      ...scale(0.5),
      marginBottom: rhythm(1.5),
      marginTop: 0,
    }}
  >
    <Link
      style={{
        boxShadow: `none`,
        textDecoration: `none`,
        color: `inherit`,
        display: 'flex',
        alignItems: 'center',
      }}
      to={`/`}
    >
      ←
      <img
        src={icon}
        alt={title}
        style={{
          margin: 0,
          width: 32,
          height: 32,
        }}
      />
    </Link>
  </div>
);

export default Layout;
export { NavRoot };
