const keys = require('./keys');
// ---------------------------------------------------------------------- //
// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//this app will receive any http request coming or going to react server
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ---------------------------------------------------------------------- //
// Postgres Client Setup
const {Pool} = require('pg');
const pgClient = new Pool({
    user: keys.PGUSER,
    password: keys.PGPASSWORD,
    host: keys.PGHOST,
    database: keys.PGDATABASE,
    port: keys.PGPORT
});

// add listener on error
pgClient.on('error', () => console.log('Lost PG connection'));

// create a table to store the indecis of values
pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err));

// ---------------------------------------------------------------------- //
// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

// ---------------------------------------------------------------------- //
// Express route handlers

app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

app.post('/values', async (req, res) => {
    const index = req.body.index;
    if (parseInt(index) > 40) {
        return res.status(422).send('Index too high');
    }
    redisClient.hset('values', index, 'Nothing yet!');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({working: true});
});

app.listen(5000, err => {
    console.log('Lisetening');
});