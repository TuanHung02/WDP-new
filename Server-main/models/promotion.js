import mongoose, { ObjectId, Schema } from 'mongoose'

const Promotion = mongoose.model("Promotion", new Schema({
    "id": {
        type: Schema.Types.ObjectId
    },
    "promotion_title": {
        type: String,
        required: true,
    },
    "promotion_description": {
        type: String,
        required: true,
    }
}))