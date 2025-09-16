import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, time } = req.query;

let filter = {};

if (category) {
  filter.category = category;
}

if (time) {
  const now = new Date();
  let startDate;

  if (time === 'today') {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (time === 'week') {
    const dayOfWeek = now.getDay();
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
    endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - dayOfWeek) + 1);
  } else if (time === 'month') {
  startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  filter.date = { $gte: startDate, $lt: endDate };
}


}

    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET total spent by category
router.get('/summary', async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

// TEMP: Seed sample expenses
router.post('/seed', async (req, res) => {
  try {
    const sampleExpenses = [
      { title: 'Lunch', amount: 300, category: 'Food', date: new Date() },
      { title: 'Cab', amount: 800, category: 'Travel', date: new Date() },
      { title: 'Shoes', amount: 450, category: 'Shopping', date: new Date() }
    ];
    await Expense.insertMany(sampleExpenses);
    res.json({ message: 'Sample expenses added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
