class MissingTokenError extends Error {

    constructor() {
        super();
        this.message = 'Access token is missing';
        this.status = 401;
    }
}

exports.MissingTokenError = MissingTokenError;
