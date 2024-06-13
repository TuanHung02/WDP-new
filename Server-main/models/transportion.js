import mongoose, {Schema } from 'mongoose'

const Transportion = mongoose.model("Transportion", new Schema({
    "transportion_id" : {
        type : Schema.Types.ObjectId,
        require : true
    },
    "transportion_name" : {
        type : String,
        require : true
    }
}))

export default Transportion;