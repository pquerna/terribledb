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

var http = require('http');

var storage = require('./storage');
var defs = require('./api_defs');
var Valve = require('swiz').Valve;

var VALID_COMMANDS = [
  'BatchGetItem',
  'CreateTable',
  'DeleteItem',
  'DescribeTable',
  'GetItem',
  'ListTables',
  'PutItem',
  'Query',
  'Scan',
  'UpdateItem',
  'UpdateTable'];

var TENANT_ID_REGEX = new RegExp(/^[a-zA-Z0-9_\-]+$/);

function TDBApi(port) {
  this._port = port;
  this._server = http.createServer();

  this._server.on('request', TDBApi.prototype._request.bind(this));
};

TDBApi.prototype.listen = function(callback) {
  this._server.listen(this._port, callback);
};

TDBApi.prototype._invalidRequest = function(req, res, why) {
  if (!why) {
    why = 'Invalid method?';
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write(why + '\n\n');
  res.end();
};

TDBApi.prototype._crashed = function(req, res, why) {
  if (!why) {
    why = new Error('unknown error');
  }
  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.write(why.stack + '\n');
  res.end();
};

TDBApi.prototype._getTenantId = function(req) {
  var tenantId = null;

  if (req.headers['x-tenant-id']) {
    tenantId = req.headers['x-tenant-id'];
  }
  else if (req.headers['x-amzn-authorization']) {
    /* TODO: parse out access id */
  }

  /* TODO: validate tenandId is in allowed set of characters */
  return tenantId;
};

TDBApi.prototype._request = function(req, res) {
  var self = this,
      cmd,
      tenantId,
      body = null,
      buffer = '';

  if (req.method === "POST" && req.path === "/" && req.headers['x-amz-target']) {
    cmd = req.headers['x-amz-target'];

    /* Exanple: DynamoDB_20111205.CreateTable  */
    cmd = cmd.split('.', 2);

    if (cmd.length != 2) {
      return this._invalidRequest(req, res, 'Expected valid command in x-amz-target header');
    }

    cmd = cmd[1];

    if (VALID_COMMANDS.indexOf(cmd) === -1) {
      return this._invalidRequest(req, res, 'Invalid Command');
    }

    tenantId = this._getTenantId(req);

    if (!tenantId) {
      return this._invalidRequest(req, res, 'Expected either x-tenant-id or x-amzn-authorization headers.');
    }

    if (!TENANT_ID_REGEX.test(tenantId)) {
      return this._invalidRequest(req, res, 'TenantId contains invalid characters.');
    }


    req.on('data', function(data) {
      buffer += data;
    });

    req.on('end', function() {
      try {
        body = JSON.parse(buffer);
      }
      catch (e) {
        return self._crashed(req, res, e);
      }

      storage.getEngine(tenantId, function(err, se) {
        var func,
            input = {};

        if (err) {
          return self._crashed(req, res, err);
        }

        cmd = '_' + cmd;

        self[cmd](se, body, req, res);

      });
    });
  }
  else {
    return this._invalidRequest(req, res);
  }
};

TDBApi.prototype._CreateTable = function(se, body, req, res) {
  /** 
   * TODO: Validate Schema for body 
   */
  var v = new Valve(defs.validators.CreateTable);

  v.check(body, function(err, cleaned) {
    if (err) {
      return this._invalidRequest(req, res, err);
    }
    se.CreateTable(cleaned, function(err, result) {
      
    });
  });
};

exports.run = function (port, callback) {
  var api = new TDBApi(port);
  api.listen(callback);
};

