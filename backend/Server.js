require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const stripe = require('stripe')('sk_test_51NFZozSB3kBunezUi10wFB3y2jiQ1nQ3nGrAlHJQp5sVf60eiCnFtJar9dK1S5wyc0AEji0YOYeKpWDTaPqYoTFA000TIA4WZh');
const app = express();
app.use(express.static('public'));
app.use(express.json())
app.use(cors())

//Connect to the mongodb database
// mongoose.connect(process.env.MONGO_DB_URL, {
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }); () => {
//     console.log("Connected to mongodb")
// }


// Create a post request for creating the session
app.post("/create-checkout-session", async(req,res) => {
    try {
        //Get the items from the req.body
        const {cartItems} = req.body
        // Create an array of line items for the session
        const lineItems = cartItems.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title
                    },
                    unit_amount: item.price * 100 //In cents
                },
                quantity: item.quantity
            }
        });

        // Create the session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        })
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


app.listen(5000, () => {
    console.log("Listening on Port 5000")
})