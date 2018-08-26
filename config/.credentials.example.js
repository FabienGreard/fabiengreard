//Rename it .credentials.js and use your own credentials
module.exports = {
  username: 'your_username',
  password: 'your_password',
  host: 'your_domain.com',
  keys: '/etc/letsencrypt/live/your_domain.com/privkey.pem',
  cert: '/etc/letsencrypt/live/your_domain.com/cert.pem',
  googleAnalyticsId: 'your_google_analytics_id',
  //empty or set it to null if you don't want to use a specific social
  socials: {
    linkedin: 'your_url',
    github: 'your_url',
    codepen: 'your_url',
    twitter: 'your_url',
    facebook: 'your_url'
  }
};
