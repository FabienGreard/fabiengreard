import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm, scale } from '../utils/typography';

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

const LayoutQuery = graphql`
  query LayoutQuery {
    avatar: file(absolutePath: { regex: "/icon.png/" }) {
      childImageSharp {
        fixed(width: 64, height: 64) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

const NavRoot = ({ title }) => (
  <StaticQuery
    query={LayoutQuery}
    render={data => (
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
          }}
          to={`/`}
        >
          ←
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={title}
            style={{ width: 32, height: 32, top: 8 }}
          />
        </Link>
      </div>
    )}
  />
);

export default Layout;
export { NavRoot };
