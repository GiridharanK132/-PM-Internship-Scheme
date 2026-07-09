const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const resolver = new dns.Resolver();
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  resolver.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {}

const originalLookup = dns.lookup;
dns.lookup = function(hostname, options, callback) {
  let opt = {};
  let cb = callback;
  if (typeof options === 'function') cb = options;
  else if (typeof options === 'object') opt = options;
  if (hostname.endsWith('mongodb.net')) {
    resolver.resolve4(hostname, (err, addresses) => {
      if (err || addresses.length === 0) originalLookup(hostname, options, cb);
      else {
        if (opt.all) cb(null, addresses.map(addr => ({ address: addr, family: 4 })));
        else cb(null, addresses[0], 4);
      }
    });
  } else originalLookup(hostname, options, cb);
};

const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function countUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const count = await User.countDocuments();
    console.log(`Total registered students in database: ${count}`);
    process.exit();
  } catch (err) {
    console.error('Error counting users:', err);
    process.exit(1);
  }
}

countUsers();
