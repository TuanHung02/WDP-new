import mongoose, {ObjectId, Schema} from 'mongoose'

const Booking = mongoose.model("Booking", new Schema({
    "booking_date": {
        type: Date,
        default : new Date(),
        required: true,
    },
    "tour_id" : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "Tour"
    },
    "user_id" : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    "isPay" : {
        type : Boolean,
        default : false
    },
},{
    timestamps : true
}))
export default Booking