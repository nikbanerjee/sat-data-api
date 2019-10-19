// dependencies
const express = require('express');
const http = require('http');
const cors = require('cors');
const config = require('./config');
const fs = require('fs');

const PORT = config.PORT || '3000';
const HOST = config.HOST || '0.0.0.0';
const app = express();

// define configurations
app.use('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set up routes
require('./utils/RouteLoader')(app);

// create http server
let httpServer = http.createServer(app);

// listen on provided port, on all network interfaces
httpServer.listen(PORT, HOST, () => {
  console.log(`server listening on ${PORT}`);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.log(err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send('error', err.message);
});

module.exports = app;
