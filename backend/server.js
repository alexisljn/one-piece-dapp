const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const bodyParser = require("body-parser");
const {generateNonceChallenge, challengeNonce, generateJwtToken, requireLogin, cleanNonce} = require('./managers/AuthManager');
const {SiweMessage, SiweError} = require("siwe");
const {NonceError} = require('./errors/NonceError');
const {areParametersMissing} = require("./helpers/UtilHelper");
const {MissingParametersError} = require("./errors/MissingParametersError");

require('dotenv').config();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/auth/nonce', (req, res) => {
    console.log('/auth/nonce');

    res.json({nonce: generateNonceChallenge()});
})

app.post('/auth/login', async (req, res) => {
    try {
        console.log('/auth/login');

        areParametersMissing(req.body, ['message', 'signature']);

        const {message, signature} = req.body;

        const preparedMessage = new SiweMessage(message)
        const fields = await preparedMessage.verify({signature});

        const {nonce} = fields.data;

        challengeNonce(nonce);

        // Generate jwt

        res.json({toto: "momo"});
    } catch (error) {
        console.log(error); // Log into server

        /* Specific handle of SiweError from Siwe package */
        if (error.hasOwnProperty('error') && error.error instanceof SiweError) {
            const {type} = error.error;
            cleanNonce(req.body.message.nonce);

            res.status(401);
            res.json({error: type});
            return;
        }

        switch (error.constructor) {
            case MissingParametersError:
                res.status(error.status);
                res.json({error: error.message});
                break;
            case NonceError:
                cleanNonce(req.body.message.nonce);
                res.status(error.status);
                res.json({error: error.message});
                break;
            default:
                cleanNonce(req.body.message.nonce);
                res.status(500);
                res.json({error: 'Something went wrong'});
        }
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

