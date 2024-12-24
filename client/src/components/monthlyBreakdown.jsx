import React from 'react';
import { Card } from '@/components/ui/card';


const expenses = [
  { category: 'Food', amount: 1200, percentage: 38, color: 'orange' },
  { category: 'Transport', amount: 1200, percentage: 38, color: 'red' },
  { category: 'Healthcare', amount: 1200, percentage: 38, color: 'yellow' },
  { category: 'Education', amount: 1200, percentage: 38, color: 'green' },
  { category: 'Clothes', amount: 1200, percentage: 38, color: 'blue' },
  { category: 'Pets', amount: 1200, percentage: 38, color: 'teal' },
  { category: 'Entertainment', amount: 1200, percentage: 38, color: 'gray' },
];

export default function MonthlyBreakdown() {
  return (
    <Card className="w-1/2 p-4 flex flex-col gap-8" >
      <h1 className='text-lg font-bold'>Monthly Expenses Breakdown</h1>
      <div className="flex h-3 rounded overflow-hidden +,">
        {expenses.map((expense, index) => (
          <div
            key={index}
            style={{
              width: `${expense.percentage}%`,
              backgroundColor: expense.color,
            }}
          />
        ))}
      </div>
      <div>
        {expenses.map((expense, index) => (
          <div key={index} className="flex justify-between py-2">
            <div className="flex items-center">
              <div
                className={`w-2.5 h-2.5  rounded-full mr-2`}
                style={{ backgroundColor: expense.color }}
              />
              <p>{expense.category}</p>
            </div>
            <div className='flex items-center '>
              <p>${expense.amount}</p>
              <p className='ml-2 font-bold'>{expense.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}