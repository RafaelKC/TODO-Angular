const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://localhost:9880',
    secure: false,
    logLevel: 'debug',
  }
]

module.exports = PROXY_CONFIG;
