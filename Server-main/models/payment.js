import mongoose, { ObjectId, Schema } from 'mongoose'

const Payment = mongoose.model("Payment", new Schema({
    "total_amount": {
        type: String,
        required: true
    },
    "payment_details" : {
        type : String,
        require : true,
    },
    "user_id": {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    "tour_id" : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "Tour"
    }
}))
export default Payment;