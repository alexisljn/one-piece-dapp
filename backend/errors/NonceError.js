class NonceError extends Error {

    constructor() {
        super();
        this.message = 'Nonce challenge failed'
        this.status = 401;
    }
}

exports.NonceError = NonceError;
