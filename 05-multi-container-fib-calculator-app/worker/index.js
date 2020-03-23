const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: ()=> 1000
});

const sub = redisClient.duplicate();

// not ideal solution, used here because it's solwer so to make use of redis
function fib(index) {
    if (index < 2) return 1;
    return fib(index-1) + fib(index-2);
}

// calculate the fib value and store in key-value in redis
sub.on('message', (channel, message) => {
    redisClient.hest('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');