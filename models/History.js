import mongoose from "mongoose"

const History = mongoose.Schema({
    data: String,
    time: String
})

export default mongoose.model('historys', History) 