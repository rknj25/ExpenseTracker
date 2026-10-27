import mongoose from 'mongoose';
const expenseSchema = new mongoose.Schema({
 title: String,
 amount: Number,
 category: String
});
const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;