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

exports.nonceChallenge = nonceChallenge;
exports.generateNonceChallenge = generateNonceChallenge;
exports.challengeNonce = challengeNonce;
