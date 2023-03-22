import mongoose, {Schema} from "mongoose";
import validator from 'validator'

const { isEmail } = validator

const entrySchema = new Schema({
    name : {
        type: String,
        required: true
    },
    phoneNumber : {
        type: String,
        required: true
    },
    email : {
        type: String,
        validate: [ isEmail, 'Invalid Email' ],
        required: true,
        unique: true
    },
    hobbies : {
        type: String
    }
})

const Entry = mongoose.model('Entry', entrySchema)

export default Entry