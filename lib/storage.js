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

var StorageEngine = require('./storage_engine').StorageEngine;
var path = require('path');

exports.fsckAll = function(basePath, callback) {
  callback();
};

exports.getEngine = function (basePath, tenantId, callback) {
  var se = null,
      p = path.join(basePath, tenandId);

  async.series([
    function mkdirPath(cb) {
      cb();
    },

    function() {
      /* TODO: LRU cache of StorageEngines */
      se = new StorageEngine(p);
      cb(null, se);
    }],
    function getEngineComplete(err, db) {
      callback(null, db[0]);
    });
};
