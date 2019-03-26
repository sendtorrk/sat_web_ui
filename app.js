//
// Raja Kannan
//

'use strict';

const express = require('express');
const serveStatic = require('serve-static');
const connectHistoryApiFallback = require('connect-history-api-fallback');
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const httpProxyMiddleware = require('http-proxy-middleware');

// Signal handlers
process.on('SIGTERM', () => {
  console.log('Signal SIGTERM received');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Signal SIGINT received');
  process.exit(0);
});

const uiPort = 8443;
const uiApp = express();

uiApp.use(connectHistoryApiFallback());
uiApp.use(serveStatic(__dirname + '/dist/spa-mat'));

uiApp.use('/ui', httpProxyMiddleware({
  target: 'https://' + (process.env.SAT_SERVER_HOST || 'localhost') + ':' + (process.env.SAT_SERVER_PORT || '8444'),
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/ui': '/api'
  }
}));

// Error handler
uiApp.use((err, req, res, next) => {
  if (err.stack) {
    console.log('ERROR: ' + err.stack);
  }

  console.log('ERROR: ' + http.STATUS_CODES[500] + ': ' + err);
  return res.status(500).json(err);
});

const uiHttpsServer = https.createServer({
  key: fs.readFileSync('crt/SatKey.key', 'utf8'),
  cert: fs.readFileSync('crt/SatCert.crt', 'utf8'),
}, uiApp);

uiHttpsServer.listen(uiPort);

console.log(`UI server started and listening on port ${uiPort}`);