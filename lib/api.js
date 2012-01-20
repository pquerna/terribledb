/*
 *  Copyright 2012 Paul Querna
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

var storage = require('./storage');
var http = require('http');

function TDBApi(port) {
  this._port = port;
  this._server = http.createServer();

  this._server.on('request', TDBApi.prototype._request.bind(this));
};

TDBApi.prototype.listen = function(callback) {
  this._server.listen(this._port, callback);
};

TDBApi.prototype._request = function(req, res) {
  res.end();
};

exports.run = function (port, callback) {
  var api = new TDBApi(port);
  api.listen(callback);
};

