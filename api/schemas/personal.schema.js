module.exports = {
    social: {
        presence: true,
        numericality: {
            message: '^Social must be numeric'
        },
        length: {
            minimum: 9,
            maximum: 9,
            tooShort: "^Social needs to have %{count} digits or more",
            tooLong: "^Whoa that's too much"
        }
    },
    first_name: {
        presence: {
            allowEmpty: false,
        },
    },
    last_name: {
        presence: {
            allowEmpty: false
        }
    },
    preferred_title: {
        presence: true
    },
    contact_time: {
        presence: true
    }
}