const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const bodyParser = require("body-parser");
const {generateNonceChallenge} = require('./managers/AuthManager');

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/auth/nonce', (req, res) => {
    console.log('/auth/nonce');
    res.json({nonce: generateNonceChallenge()});
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

