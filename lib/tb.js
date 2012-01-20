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


var api = require('./api');
var storage = require('./storage');

function TerribleDb(data_root) {
  this._data_root = data_root;
};

exports.TerribleDb = TerribleDb;


TerribleDb.prototype.init = function (callback) {
  storage.fsckAll(this._data_root, callback);
};

TerribleDb.prototype.run = function (port) {
  api.run(port, function (err) {
    if (err) {
      console.error('API ERROR: ');
      console.error(err);
      process.exit(1);
      return;
    }
    else {
      console.log('TerribleDb server online at: http://127.0.0.1:'+ port);
    }
  });
};
