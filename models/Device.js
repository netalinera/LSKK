import mongoose from "mongoose"

const Device = mongoose.Schema({
    title: String,
    body: String
})

export default mongoose.model('devices', Device) 