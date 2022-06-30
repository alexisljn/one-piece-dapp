class MissingParametersError extends Error {
    constructor(missingParameters) {
        super();
        this.message = this.buildMessage(missingParameters);
        this.status = 422;
    }

    buildMessage(missingParameters) {
        let string = "Following parameters are missing :";
        missingParameters.forEach(missingParameter => {
            string += ` ${missingParameter},`
        })

        string = string.substring(0, string.length - 1);

        return string;
    }
}

exports.MissingParametersError = MissingParametersError;
