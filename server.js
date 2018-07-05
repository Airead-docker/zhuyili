const express = require('express')
const dns = require('dns')
const MongoClient = require('mongodb').MongoClient

const app = express()

process.on('SIGINT', function() {
    process.exit();
});
process.on('SIGTERM', function() {
    process.exit();
});

const dbName = 'zhuyili'
const url = 'mongodb://mongodb:27017'
var db = null
MongoClient.connect(url, function(err, client) {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log("Connected successfully to server")

    db = client.db(dbName)
})

dns.lookup('mongodb', (err, address, family) => {
    console.log(err, address, family)
})

app.use(express.static('public'))

app.get('/insert/:type/:start_ts/:mseconds', (req, res) => {
    console.log('received', req.params)
    const coll = db.collection('records')
    coll.insert(req.params, (err, result) => {
        if (err) {
            console.log('err', err)
            return
        }
        console.log('result', result)
        res.send('ok')
    })
})

app.get('/list', (req, res) => {
    const coll = db.collection('records')
    coll.find({}).toArray((err, docs) => {
        if (err) {
            console.log('err', err)
            return
        }
        let ret = []
        docs.forEach(function(doc) {
            ret.push([doc.type, doc.start_ts, doc.mseconds])
        })
        console.log('get', ret.length)
        res.json(ret)
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
