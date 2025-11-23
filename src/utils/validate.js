const validator = require("validator")

const validateSignupData = (req) => {
    const { firstName, lastName, password, email } = req.body;

    if (!firstName || !lastName) {
        throw new Error("User should enter valid name")
    } else if (!validator.isEmail(email)) {
        throw new Error("User should enter valid email")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("User should enter strong password")
    }
}

const validateEditProfileData = (req) => {
    const ALLOWED_EDIT_DATA=['firstName', 'lastName', 'age', 'skills', 'about', 'email', 'photoUrl', 'gender']

    const isValidEditData = Object.keys(req.body).every((field)=> ALLOWED_EDIT_DATA.includes(field))

    if(!isValidEditData){
        throw new Error("Invalid edit data");
    }
}

module.exports = {
    validateSignupData,
    validateEditProfileData
}