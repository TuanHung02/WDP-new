import mongoose, { ObjectId, Schema } from "mongoose"

const User = mongoose.model("User", new Schema({
    "username": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        required: true,
    },
    "password": {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length >= 8,
            message: "Length password must be greater than 8 ~~~",
        },
    },
    "dob": {
        type: Date,
        required: true
    },
    "gender": {
        type: String,
        required: true,
    },
    "phoneNumber": {
        type: String,
        required: true
    },
    "address": {
        type: String,
        required: true
    },
    "avatar": {
        type: String,
    },
    "role_id" : {
        type : Schema.Types.ObjectId,
        ref : "Role",
        require : true
    }
}))
export default User;