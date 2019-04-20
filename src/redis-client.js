const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL);   // this is from the docker-compose.yml

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});



module.exports = client;
