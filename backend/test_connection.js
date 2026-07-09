const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const resolver = new dns.Resolver();
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  resolver.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {
  console.warn('Failed to set DNS servers:', e.message);
}

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

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

async function run() {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    await client.connect();
    console.log('Connected successfully!');
    const db = client.db('pmscheme');
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('Connection failed:');
    console.error(err);
    if (err.reason && err.reason.servers) {
      console.log('\nDetailed Server Info:');
      for (const [key, server] of err.reason.servers.entries()) {
        console.log(`Server: ${key}`);
        console.log(`- Type: ${server.type}`);
        console.log(`- Error:`, server.error);
      }
    }
  } finally {
    await client.close();
  }
}

run();
