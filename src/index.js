
const express = require('express');
const redisClient = require('./redis-client');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    return res.send('Hello world');
});

app.put('/redis-key', (req, res) => {
    const {redisKey , redisValue} = req.query;
    redisClient.set(redisKey, redisValue, (err, response) => {
        if (err) {
            console.log(err)
            res.json(err)
        }
        else {
            console.log(response)
            res.json(`Key:Value pair of ${redisKey}:${redisValue} added to Redis`)
        }
            
    })
})

app.get('/redis-key', (req, res) => {
    const {redisKey} = req.query;
    redisClient.get(redisKey, (err, response) => {
        if (err){
            console.log(err)
            res.json("Key not Found")
        }else{
            console.log(response);
            res.json(`Key '${redisKey}' found in Redis! Value is '${response}'`)
        }
    });
    
})

app.listen(PORT, () => {
    console.log(`Express Server listening on port ${PORT}`);
});