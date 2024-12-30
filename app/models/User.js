import { model, models, Schema } from "mongoose";
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
    },
    phnumber: {
        type: Number,
    },
    company: {
        type: String,
    },
    razorpay_id: {
        type: String,
    },
    razorpay_secret: {
        type: String,
    },

    coverpic: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})
export default models.User || model('User', UserSchema)