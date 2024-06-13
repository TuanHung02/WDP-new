import mongoose, {ObjectId, Schema} from 'mongoose'

const Role = mongoose.model("Role", new Schema({
    "id": {
        type: Schema.Types.ObjectId
    },
    "role_name": {
        type: String,
        required: true,
    },
}))
export default Role;