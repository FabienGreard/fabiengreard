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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
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
