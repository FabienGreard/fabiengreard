module.exports = {
  // credentials information
  username:
    process.env.NODE_ENV !== 'development'
      ? require('./.credentials').username
      : 'admin',
  password:
    process.env.NODE_ENV !== 'development'
      ? require('./.credentials').password
      : 'admin',
  //https keys and cert
  keys:
    process.env.NODE_ENV !== 'development'
      ? require('./.credentials').keys
      : 'admin',
  cert:
    process.env.NODE_ENV !== 'development'
      ? require('./.credentials').cert
      : 'admin',
  host:
    process.env.NODE_ENV !== 'development'
      ? require('./.credentials').host
      : 'localhost',
  googleAnalyticsId:
    process.env.NODE_ENV !== 'development'
      ? require('./.credentials').googleAnalyticsId
      : '',
  socials:
    process.env.NODE_ENV !== 'development'
      ? require('./.credentials').socials
      : {
          linkedin: 'no_url',
          github: 'no_url',
          codepen: 'no_url'
        },
  log: process.env.NODE_ENV !== 'development' ? 'combined' : 'dev',
  //you may want to disable https
  protocole: process.env.NODE_ENV !== 'development' ? 'https' : 'http',
  // Setting port for server
  port: process.env.NODE_ENV !== 'development' ? 80 : 8080
};
