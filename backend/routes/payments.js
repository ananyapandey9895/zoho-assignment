import express from "express";
import Stripe from "stripe";
import Invoice from "../models/Invoice.js";

const router = express.Router();

/* =====================================================
   STRIPE INITIALIZATION
===================================================== */

let stripe;

const getStripe = () => {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    try {
      const key = process.env.STRIPE_SECRET_KEY.trim();
      console.log("Initializing Stripe, key length:", key.length, "starts with:", key.substring(0, 7));
      stripe = new Stripe(key, {
        apiVersion: "2023-10-16",
      });
      console.log("Stripe initialized successfully");
    } catch (error) {
      console.error("Stripe initialization failed:", error.message);
    }
  }
  return stripe;
};

/* =====================================================
   CREATE PAYMENT INTENT (Recommended Method)
===================================================== */

// Test endpoint to check invoice
router.get("/test-invoice/:invoiceId", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json({
      found: true,
      invoiceNumber: invoice.invoiceNumber,
      total: invoice.total,
      status: invoice.status,
      id: invoice._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.toString() });
  }
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    console.log('Create payment intent request:', req.body);
    
    const stripe = getStripe();
    
    if (!stripe) {
      console.error('Stripe not initialized');
      return res
        .status(500)
        .json({ message: "Stripe is not properly configured. Check STRIPE_SECRET_KEY in backend .env file." });
    }

    const { invoiceId } = req.body;

    if (!invoiceId) {
      console.error('No invoice ID provided');
      return res.status(400).json({ message: "Invoice ID is required" });
    }

    console.log('Looking for invoice:', invoiceId);
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      console.error('Invoice not found:', invoiceId);
      return res.status(404).json({ 
        message: "Invoice not found. Please create an invoice first." 
      });
    }

    if (invoice.status === "Paid") {
      console.log('Invoice already paid:', invoiceId);
      return res.status(400).json({ message: "Invoice already paid" });
    }

    console.log('Creating payment intent for amount:', invoice.total);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(invoice.total * 100), // INR paisa
      currency: "inr",
      metadata: {
        invoiceId: invoice._id.toString(),
        invoiceNumber: invoice.invoiceNumber,
      },
      description: `Payment for Invoice ${invoice.invoiceNumber}`,
    });

    console.log('Payment intent created:', paymentIntent.id);
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("PaymentIntent error:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   CREATE CHECKOUT SESSION (Alternative)
===================================================== */

router.post("/create-session", async (req, res) => {
  try {
    const stripe = getStripe();
    
    if (!stripe) {
      return res
        .status(500)
        .json({ message: "Stripe is not properly configured" });
    }

    const { invoiceId } = req.body;

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice)
      return res.status(404).json({ message: "Invoice not found" });

    if (invoice.status === "Paid")
      return res.status(400).json({ message: "Invoice already paid" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: invoice.items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.item,
            description: item.description || undefined,
          },
          unit_amount: Math.round(item.rate * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/invoices?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/invoices?cancelled=true`,
      metadata: {
        invoiceId: invoice._id.toString(),
      },
    });

    res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("❌ Checkout session error:", error);
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   VERIFY PAYMENT (Manual Fallback)
===================================================== */

router.post("/verify", async (req, res) => {
  try {
    const stripe = getStripe();
    
    if (!stripe) {
      return res
        .status(500)
        .json({ success: false, message: "Stripe not configured" });
    }

    const { invoiceId, paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res
        .status(400)
        .json({ success: false, message: "PaymentIntent ID required" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    if (paymentIntent.status === "succeeded") {
      const invoice = await Invoice.findByIdAndUpdate(
        invoiceId,
        {
          status: "Paid",
          paymentId: paymentIntent.id,
          paidAt: new Date(),
          paymentMode: "Stripe (Online)",
        },
        { new: true }
      );

      return res.json({ success: true, invoice });
    }

    return res
      .status(400)
      .json({ success: false, message: "Payment not completed" });
  } catch (error) {
    console.error("❌ Verification error:", error);
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   STRIPE WEBHOOK (Production Method)
===================================================== */

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const stripe = getStripe();
    
    if (!stripe) {
      return res.status(500).json({ error: "Stripe not configured" });
    }

    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object;
        const invoiceId = paymentIntent.metadata?.invoiceId;

        if (invoiceId) {
          await Invoice.findByIdAndUpdate(invoiceId, {
            status: "Paid",
            paymentId: paymentIntent.id,
            paidAt: new Date(),
            paymentMode: "Stripe (Online)",
          });

          console.log(`Invoice ${invoiceId} marked Paid via webhook`);
        }
      }

      res.json({ received: true });
    } catch (err) {
      console.error("Webhook processing error:", err);
      res.status(500).json({ message: "Webhook processing failed" });
    }
  }
);

/* =====================================================
   GET PAYMENT DETAILS
===================================================== */

router.get("/:invoiceId", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);

    if (!invoice)
      return res.status(404).json({ message: "Invoice not found" });

    res.json({
      invoiceId: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.total,
      status: invoice.status,
      paymentId: invoice.paymentId,
      paymentMode: invoice.paymentMode,
      paidAt: invoice.paidAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;