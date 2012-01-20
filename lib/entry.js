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

var path = require('path');
var optimist = require('optimist');
var TerribleDb = require('./tb').TerribleDb;

exports.run = function() {
  var argv, config, db;

  optimist = optimist.usage('Usage: $0 -p [port] -c [/path/to/settings.js]');
  optimist = optimist['default']('p', 8000);
  optimist = optimist['default']('c', './local_settings.js');

  argv = optimist.argv;

  config = require(path.resolve(argv.c)).config;

  if (!config) {
    config = {};
  }

  if (!config.data_root) {
    config.data_root = './temp-root'
  }

  db = new TerribleDb(config.data_root)

  db.init(function (err) {
    if (err) {
      console.error('Unable to init() with path: '+ config.data_root);
      console.error(err);
      process.exit(1);
      return;
    }

    db.run(argv.p);
  });
};
