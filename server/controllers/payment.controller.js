import Payment from "../models/Payment.model.js"
import User from "../models/User.model.js"
import razorpayInstance from "../services/razorpay.service.js"
import crypto from 'crypto'

export const createOrder = async (req, res) => {
    try{
        const { planId, amount, credits } = req.body;
        if(!amount || !credits){
            return res.status(400).json({ message: "Missing required fields" })
        }
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }
        const order = await razorpayInstance.orders.create(options)
        if(!order){
            return res.status(500).json({ message: "Failed to create order" })
        }
        await Payment.create({
            userId: req.userId,
            planId,
            amount,
            credits,
            razorpayOrderId: order.id,
            status: "created"
        })
        return res.json(order)
    }
    catch(error){
        console.error("Error creating order:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const verifyPayment = async (req, res) => {
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex')
        if(generatedSignature !== razorpay_signature){
            return res.status(400).json({ message: "Invalid payment signature" })
        }
        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id })
        if(!payment){
            return res.status(404).json({ message: "Payment record not found" })
        }
        if(payment.status === "paid"){
            return res.status(400).json({ message: "Payment already verified" })
        }
        payment.razorpayPaymentId = razorpay_payment_id
        payment.status = "paid"
        await payment.save()
        const user = await User.findByIdAndUpdate(payment.userId, { $inc: { credits: payment.credits } }, { new: true })
        return res.json({success: true, message: "Payment verified and credits added", user })
    }
    catch(error){
        console.error("Error verifying payment:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}