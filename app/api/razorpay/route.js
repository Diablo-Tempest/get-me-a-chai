import React from 'react'
import { NextResponse } from 'next/server'
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils'
import Payment from '../../models/Payment'
import User from '../../models/User'
import Razorpay from 'razorpay'
import connectDB from '../../db/connectDB'

export const POST = async(req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)
    // check if razorpay order id is present or not in the server
    let pmt = await Payment.findOne({ oid: body.razorpay_order_id })
    if(!pmt) {
        return NextResponse.json({success: true, message:"Order ID not found"})
    }
    const user = await User.findOne({username: pmt.to_user})
    // verify the payment
    let vpmt = validatePaymentVerification({order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id}, body.razorpay_signature, user.razorpay_secret)
    if(vpmt) {
        // update the payment
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, {isCompleted: true}, {new: true})
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentDone=true`)
    } else {
        return NextResponse.json({success:false, message:"Payment verification failed"})

        }
}
