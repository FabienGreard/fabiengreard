import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export default function SEO({ title, description }) {
  return (
    <Helmet>
      <html lang="en" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <link rel="shortcut icon" href="../../static/favicon.ico" />
      <meta name="description" content={description} />
    </Helmet>
  );
}

SEO.defaultProps = {
  title: 'Fabien Gréard',
  description: 'Fabien Gréard‘s universe.',
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
