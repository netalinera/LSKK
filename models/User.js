import mongoose from "mongoose"

const User = mongoose.Schema({
    username: String,
    password: String
})

export default mongoose.model('users', User) 