import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenses.js'; // ✅ Make sure this path is correct

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount the route
app.use('/api/expenses', expenseRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  })
  .catch(err => console.error(err));
