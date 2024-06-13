import mongoose, {ObjectId, Schema} from 'mongoose'


const BookingHistory = mongoose.model("BookingHistory",new Schema({
    "tour_id" : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "Tour"
    },
    "user_id" : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    }
},{
    timestamps : true
}));

export default BookingHistory