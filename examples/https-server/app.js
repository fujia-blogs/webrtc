'use strict';

const https = require('https');
const fs = require('fs');

const serverOptions = {
  key: '',
  cert: '',
};

const httpsServer = https
  .createServer(serverOptions, (req, res) => {})
  .listen(443, '0.0.0.0');
