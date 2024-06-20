const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51PPShQAeyMMyXyX6h2KUlcSF11ddcpD638OXboriOyRHvLzh5aE94SGWqx6AhqEMqvddK65ubLHUmhQfYr4wWmZm00CQYIcxrx');
const paymentController = {
    paymentSheet: async (req, res) => {
        const {totalOrder} = req.body
        // Use an existing Customer ID if this is a returning customer.
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2024-04-10'}
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalOrder,
            currency: 'vnd',
            customer: customer.id,
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter
            // is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
            enabled: true,
            },
        });

        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: 'pk_test_51PPShQAeyMMyXyX6hJzFCoORKaJxa3DOO82rBHEogafgCF7pyIjzfS7AmiMeigkPdpdZDMc9rvvpTRmes35iEuVK00quslxsWi'
        });
    }
}
module.exports = paymentController