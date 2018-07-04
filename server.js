const express = require('express')
const dns = require('dns')
const redis = require('redis')

const app = express()

process.on('SIGINT', function() {
    process.exit();
});
process.on('SIGTERM', function() {
    process.exit();
});

const client = redis.createClient('redis://redis')
client.on("error", function (err) {
    console.log("Error " + err);
});

dns.lookup('redis', (err, address, family) => {
    console.log(err, address, family)
})

app.get('/', (req, res) => res.send('Hello World Airead!'))

app.get('/:type/:start_ts/:times', (req, res) => {
    const key = [req.params.type, req.params.start_ts, req.params.times].join(':')
    console.log('received', key)
    client.set(key, '', (err, reply) => {
        console.log(err, reply)
        res.send(reply)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
