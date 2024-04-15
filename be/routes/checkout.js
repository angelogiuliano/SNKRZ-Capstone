const Stripe = require("stripe");
const express = require("express");
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_KEY);
require("dotenv").config();

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.src],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.FE_URL}/checkout-success`,
    cancel_url: `${process.env.FE_URL}/cart`,
    line_items,
    mode: "payment",
  });

  res.send({ url: session.url });
});

module.exports = router;
