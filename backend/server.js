const express = require('express');
const authRouter = require('./src/routes/auth');
const plansRouter = require('./src/routes/plans');
const paymentRouter = require('./src/routes/payment');
const webhookRouter = require('./src/routes/webhook');
const errorHandler = require('./src/middleware/errorHandler');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/plans', plansRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/verify', webhookRouter);
// app.use('/api/qr', qrRouter);
// app.use('/api/attendance', attendanceRouter);
app.use(errorHandler);

app.get('/', (req, res) => {
    return res.json({ message: "working" });
})

app.listen(3000);