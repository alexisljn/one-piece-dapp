const {MissingParametersError} = require("../errors/MissingParametersError");

function areParametersMissing(requestBody, parameters) {
    const missingParameters = [];

    parameters.forEach(parameter => {
        if (!requestBody.hasOwnProperty(parameter)) {
            missingParameters.push(parameter);
        }
    })

    if (missingParameters.length > 0) {
        throw new MissingParametersError(missingParameters);
    }
}

exports.areParametersMissing = areParametersMissing;

