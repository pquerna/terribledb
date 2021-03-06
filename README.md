# TerribleDB: A data store you should never use in production

# Status: INCOMPLETE DO NOT USE

TerribleDB is a non-scalable, low-performance, open source NoSQL database.

TerribleDB implements [Amazon's DynamoDB API](http://aws.amazon.com/dynamodb/) API.

It is written in [Node.js](http://nodejs.org), and uses [JSON files](http://www.json.org/) on disk as the primary storage backend.

The primary purpose of TerribleDB is to allow offline, development, and testing of the DynamoDB API.


# Running

TerribleDB loads its configuration from a javascript file:

    exports.config = {
        data_root: '/var/lib/terribledb'
    };

TerribleDB takes a number of options on the command line. The defaults are:

    bin/terribledb -c ./local_settings.js -p 9000

# API Changes

* TerrileDB can not implement support for [AWS Security Token Service Authentication](http://docs.amazonwebservices.com/amazondynamodb/latest/developerguide/RequestAuthentication.html#WhatIsAuthentication), because integration with the Amazon system is impossible for a third party.  The `AWSAccessKeyId` in the `x-amzn-authorization` header is used to uniquely separate multiple tenants. Alternatively, if the header `X-Tenant-Id` is present, the value is used to isolate different users of the system.

# License

TerribleDB is available under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

