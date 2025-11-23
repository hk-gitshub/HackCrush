const mongooes = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// create new Schema fields
const userSchema = mongooes.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        minLength: 4,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        validate: (value)=>{        // check strong password
            if(!validator.isStrongPassword(value)){
                throw new Error("Your password is weak: "+ value)
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: (value)=>{    // check valid emal
            if(!validator.isEmail(value)){
                throw new Error("Invalid email: "+ value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender is not valid ")
            }
        }
    },
    photoUrl:{
        type: String,
        validate: (value)=>{
            if(!validator.isURL(value)){        // check valid url
                throw new Error("Invalid photo URL: "+ value)
            }
        }
    },
    about:{
        type: String,
        default: "Hi, this is about my data"
    },
    skills: {
        type: [String]
    }
},{ timestamps:true});


// This best practice and make clean code
// schema methods
// can't use arrow function on method
// it wont support this.
 userSchema.methods.getJWT = async function() {
    const user = this; // this refere to the instance of user schema

    const token = await jwt.sign({_id : user._id}, "private-key", {expiresIn : "1d"})
    return token; 
 }

 userSchema.methods.verifyPassword = async function(passwordInputByUser){
    const passwordHash = this.password;

    const isValidpassword = await bcrypt.compare(
        passwordInputByUser, 
        passwordHash
    );

    return isValidpassword;
 }

// create model
module.exports = mongooes.model("User", userSchema);