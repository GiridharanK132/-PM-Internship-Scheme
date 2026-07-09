const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const resolver = new dns.Resolver();
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  resolver.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('Failed to set DNS servers, using system default:', e.message);
}

// Override dns.lookup to use Google DNS resolver for MongoDB Atlas shards
const originalLookup = dns.lookup;
dns.lookup = function(hostname, options, callback) {
  let opt = {};
  let cb = callback;
  if (typeof options === 'function') {
    cb = options;
  } else if (typeof options === 'object') {
    opt = options;
  } else if (typeof options === 'number') {
    opt = { family: options };
  }

  if (hostname.endsWith('mongodb.net')) {
    resolver.resolve4(hostname, (err, addresses) => {
      if (err || addresses.length === 0) {
        originalLookup(hostname, options, cb);
      } else {
        if (opt.all) {
          const results = addresses.map(addr => ({ address: addr, family: 4 }));
          cb(null, results);
        } else {
          cb(null, addresses[0], 4);
        }
      }
    });
  } else {
    originalLookup(hostname, options, cb);
  }
};

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
