import mongoose, {ObjectId, Schema} from 'mongoose'
import Tour from './tour.js'
import User from './user.js'

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
    "amount": {
        type: Number,
    },
    "number_of_people": {
        type: Number,
        min: [1, 'Number of people must be at least 1']
    }
},{
    timestamps : true
}))
export default Booking
 