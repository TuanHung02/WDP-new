import mongoose, {ObjectId, Schema} from 'mongoose'

const Schedule = mongoose.model("Schedule", new Schema({
    "id": {
        type: Schema.Types.ObjectId
    },
    "schedule_name": {
        type: String,
        required: true,
    },
    "schedule_detail": {
        type: String,
        required: true
    },
    "schedule_date": {
        type: Date,
        required: true,
    },
    "tour_id" : {
        type : Schema.Types.ObjectId,
        require : true,
        ref : "Tour"
    }
}))
export default Schedule;