import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import profilePic from '../assets/profile-pic.jpg';
import { rhythm } from '../utils/typography';

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata;
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
              alignItem: 'center',
            }}
          >
            <img
              src={profilePic}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                width: rhythm(2),
                height: rhythm(2),
              }}
            />
            <p style={{ maxWidth: 260, margin: 0 }}>
              Personal blog by{' '}
              <a href={`https://www.linkedin.com/in/${social.linkedin}`}>
                {author}
              </a>
              . I write about code and life.
            </p>
          </div>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
        social {
          linkedin
        }
      }
    }
  }
`;

export default Bio;
