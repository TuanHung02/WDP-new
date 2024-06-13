import mongoose, { ObjectId, Schema, Types } from 'mongoose'

const Tour = mongoose.model("Tour", new Schema({
    "tour_name": {
        type: String,
        required: true,
    },
    "tour_description": {
        type: String,
        required: false,
    },
    "tour_transportion" : [
        {
            type : Schema.Types.ObjectId,
            ref : "Transportion",
            require : true
        }
    ],
    "tour_price": {
        type: Number,
        required: true,
    },
    "discount" : {
        type : Number,
        default : 0
    },
    "tour_img": [
        {
            type : String,
            required : true,
        }
    ],
    "max_tourist": {
        type: Number,
        required: true,
    },
    "start_date": {
        type: Date,
        required: true,
    },
    "end_date" : {
        type : Date,
        require : true
    },
    "duration" : {
        type : Number,
        require : true
    },
    "start_position" : {
        type : Schema.Types.ObjectId,
        ref : "Location",
        require : true,
    },
    "end_position" : [
        {
            type : Schema.Types.ObjectId,
            ref : "Location",
            require : true,
        }
    ],
    "return_status" : {
        type : Boolean,
        default : true,
        require : true
    },
    "return_tax" : {
        type : Number,
        default : 0,
        require : true
    },
    "isAppove" : {
        type : String,
        enum : ['APPROVE','DECLINE','NOTAPPROVE'],
        default : 'NOTAPPROVE'
    },
    "ownerId" : {
        type : Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    "reason" : {
        type : String,
        default : ""
    }
    
}))
export default Tour;