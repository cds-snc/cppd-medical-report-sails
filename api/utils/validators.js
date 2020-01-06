const birthDateValidator = (value) => {
    if (value) {
        return {
            validateDateFormat: {
                message: '^Birthdate is not formatted correctly'
            },
            validateDateExists: {
                message: '^Birthdate is not a valid date'
            }
        };
    }
    return {
        presence: {
            allowEmpty: false,
            message: '^Birthdate is required'
        },
    };
}

module.exports = { birthDateValidator };
