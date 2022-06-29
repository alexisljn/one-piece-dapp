const { generateNonce } = require("siwe");
const { NonceError } = require('../errors/NonceError');

const nonceChallenge = {};

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

exports.nonceChallenge = nonceChallenge;
exports.generateNonceChallenge = generateNonceChallenge;
exports.challengeNonce = challengeNonce;
