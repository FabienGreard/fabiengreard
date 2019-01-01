import React from 'react';

import profilePic from '../assets/profile-pic.jpg';
import { rhythm } from '../utils/typography';

function Bio() {
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
        alt="fabien greard"
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          width: rhythm(2),
          height: rhythm(2),
          borderRadius: '50%',
        }}
      />
      <p style={{ maxWidth: 260, margin: 0 }}>
        Personal blog by{' '}
        <a href="https://twitter.com/fabien_greard">Fabien Greard</a>. I write
        about code and life.
      </p>
    </div>
  );
}

export default Bio;
