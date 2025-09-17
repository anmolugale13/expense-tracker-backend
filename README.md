# 💸 Expense Tracker — Backend

A Node.js + Express backend for managing expense data via RESTful APIs. Built for seamless integration with the frontend, this backend handles CRUD operations, connects to MongoDB Atlas, and supports secure deployment.

## 🚀 Live API

🔗 https://expense-tracker-backend-1-67dl.onrender.com/api/expenses

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Render (for deployment)

## 📁 Folder Structure

backend/ 

├── models/ 

│ └── Expense.js

├── routes/

│ └── expenses.js

├── .env

├── .gitignore 

├── package.json

├── package-lock.json 

└── server.js


## 🔚 API Endpoints

All endpoints are prefixed with `/api/expenses`

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | `/api/expenses`        | Fetch all expenses              |
| POST   | `/api/expenses`        | Add a new expense               |
| DELETE | `/api/expenses/:id`    | Delete an expense               |
| GET    | `/api/expenses/summary`| Return total spent by category  |

**Data model includes:** `title`, `amount`, `category`, `date`


## 🌐 Environment Variables

Create a `.env` file in the root of the backend project:

MONGODB_URI=your-mongodb-atlas-connection-string PORT=5000


## 📦 Installation

```bash
git clone https://github.com/anmolugale13/expense-tracker-backend.git
cd expense-tracker-backend
npm install
npm start

