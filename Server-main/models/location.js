import mongoose, {ObjectId, Schema} from 'mongoose';

const Location = mongoose.model("Location",new Schema({
    "id" : {
        type : Schema.Types.ObjectId,
        require :  true
    },
    "location_name" : {
        type : String,
        require : true
    }
}))

export default Location;