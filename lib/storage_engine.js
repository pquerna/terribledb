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

/**
 * Absolute path to the stoarge backing.
 */
function StorageEngine(path) {
  this._path = path;
}
exports.StorageEngine = StorageEngine;

StorageEngine.prototype._fsck = function(ctx, callback) {
  callback();
};

StorageEngine.prototype.CreateTable = function(ctx, req, callback) {
  callback();
};

