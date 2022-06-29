const {generateNonce} = require("siwe");
const {NonceError} = require('../errors/NonceError');
const {MissingTokenError} = require("../errors/MissingTokenError");
const jwt = require("jsonwebtoken");

const nonceChallenge = {};

const TIMESTAMP_EXPIRATION_DELAY = 30000; // 30s

function generateNonceChallenge() {
    const nonce = generateNonce();

    nonceChallenge[nonce] = Date.now();

    return nonce;
}

function challengeNonce(nonce) {
    if (!isNonceValid(nonce)) {
        throw new NonceError();
    }
}

function isNonceValid(nonce) {
    return (nonceChallenge[nonce] && nonceChallenge[nonce] + TIMESTAMP_EXPIRATION_DELAY >= Date.now());
}

function generateJwtToken(siweMessage, signature) {
    return jwt.sign(createJwtPayload(siweMessage, signature), process.env.APPLICATION_SECRET)
}

function createJwtPayload(siweMessage, signature) {
    const {nonce, address} = siweMessage

    return {
        nonce,
        address,
        signature
    };
}

function requireLogin(req, res, next) {
    try {
        if (!req.headers.hasOwnProperty('Authorization'.toLowerCase())) {
            throw new MissingTokenError();
        }

        const token = req.headers['Authorization'.toLowerCase()].split(' ')[1];

        jwt.verify(token, process.env.APPLICATION_SECRET);

        next();
    } catch (error) {
        console.error(error); // Log on server
        res.json({error: error.message});
        res.status(error.status || 401);
    }
}

exports.nonceChallenge = nonceChallenge;
exports.generateNonceChallenge = generateNonceChallenge;
exports.challengeNonce = challengeNonce;
