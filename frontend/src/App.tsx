import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type ExpenseTotal = {
  total: number;
};

async function getTotalExpenses() {
  const res = await fetch('/api/expenses/total-amount');
  const json: ExpenseTotal = await res.json();
  return json;
}

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
};

type ExpensesResponse = {
  expenses: Expense[];
};

async function getAllExpenses() {
  const res = await fetch('/api/expenses');
  const json: ExpensesResponse = await res.json();
  return json;
}

function App() {
  const totalAmountQuery = useQuery({
    queryKey: ['total-amount'],
    queryFn: getTotalExpenses,
  });

  const allExpensesQuery = useQuery({
    queryKey: ['all-expenses'],
    queryFn: getAllExpenses,
  });

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const submitExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        amount: Number(amount),
        date,
      }),
    });
    allExpensesQuery.refetch();
    totalAmountQuery.refetch();
  };

  return (
    <div className="w-screen h-screen bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-center">Expenses</h1>
      {totalAmountQuery.error ? (
        <div>{(totalAmountQuery.error as any).message}</div>
      ) : totalAmountQuery.isLoading ? (
        <div className="flex flex-col max-w-96 m-auto animate-pulse">
          Total Spent ...
        </div>
      ) : (
        <div className="flex flex-col max-w-96 m-auto">
          Total Spent {totalAmountQuery.data?.total}
        </div>
      )}

      {allExpensesQuery.error ? (
        <div>{(allExpensesQuery.error as any).message}</div>
      ) : allExpensesQuery.isLoading ? (
        <div className="flex flex-col max-w-96 m-auto animate-pulse">
          All Expenses ...
        </div>
      ) : (
        <div className="flex flex-col max-w-96 m-auto">
          <h2 className="text-2xl pt-6">All expenses</h2>
          {allExpensesQuery.data?.expenses.map((expense) => (
            <div key={expense.id} className="flex justify-between">
              <div>{expense.title}</div>
              <div>{expense.amount}</div>
              <div>{expense.date}</div>
            </div>
          ))}
        </div>
      )}

      <form className="flex flex-col max-w-96 m-auto pt-6" onSubmit={submitExpense}>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="mb-2"
          style={{ color: 'black' }} // Set input text color to black
        />
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="mb-2"
          style={{ color: 'black' }} // Set input text color to black
        />
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
          className="mb-2"
          style={{ color: 'black' }} // Ensure date picker text is also black
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Expense</button>
      </form>

    </div>
  );
}

export default App;



