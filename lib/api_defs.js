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


var swiz = require('swiz');
var o = swiz.struct.Obj;
var f = swiz.struct.Field;
var Chain = swiz.Chain;


var KeySchema_KEYS = ['HashKeyElement', 'RangeKeyElement'];

/* TODO: add custom validator */
var Attribute_KEYS = ['AttributeName', 'AttributeType']
var Attribute_DEFS = new Chain().isHash(new Chain().isString().inArray(Attribute_KEYS),
                                        new Chain().isString().len(1, 255));

exports.defs = [
  o('CreateTable',{
    'fields': [
      f('TableName', {'desc': 'The name of the table to create.', 'val': new Chain().isString().len(3, 255)}),
      f('KeySchema', {'desc': 'A hash of notification specific details based on the notification type.',
                       'val': new Chain().isHash(new Chain().isString().inArray(KeySchema_KEYS),
                                                 Attribute_DEFS)}),
      ]
    }),
];

exports.validators = swiz.defToValve(exports.defs);

