"use server"
import Razorpay from 'razorpay'
import Payment from '../models/Payment'
import connectDB from '../db/connectDB'
import User from '../models/User'

export const initiate = async (amount, to_username, paymentForm)=>{
    await connectDB()
    const user = await User.findOne({username: to_username})
    let instance = new Razorpay({ key_id: user.razorpay_id, key_secret: user.razorpay_secret })
    instance.orders.create({
        amount: 5000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    })
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let order = await instance.orders.create(options)
    // create a payment order which shows a pending payment in the database
    await Payment.create({oid: order.id, amount: amount/100, to_user: to_username, name: paymentForm.name, message: paymentForm.message})
    return order
}
export const fetchUser = async(username)=>{

    await connectDB()
    let user = await User.findOne({username:username}).lean()
    if (user && user._id) {
        user._id = user._id.toString(); // Convert _id to string
    }
    return user
}

export const fetchPayments =async(username)=>{
    await connectDB()
    // find all payments 
    let payments = await Payment.find({to_user:username, isCompleted: true}).lean()
    payments.forEach(payment => {
        if (payment._id) {
            payment._id = payment._id.toString(); // Convert _id to string
        }
    });
    return payments
}
export const deleteFailedPayments = async()=>{
    await connectDB()
    await Payment.deleteMany({isCompleted: false})
}
export const updateProfile = async(data, oldusername)=>{
    await connectDB()
    
    if(oldusername !== data.username){
        let existingUser = await User.findOne({username: data.username})
        if(existingUser){
                console.log("Username already exists")
        }
        else{
            await Payment.updateMany({to_user: oldusername}, {to_user: data.username}) 
            await User.updateOne({email: data.email}, data)
        }
    }
    else{
        await User.updateOne({email: data.email}, data)
    }
}