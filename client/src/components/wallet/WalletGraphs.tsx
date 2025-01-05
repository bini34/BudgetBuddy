"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts'

interface WalletGraphsProps {
  selectedWallet: string | null
}

export function WalletGraphs({ selectedWallet }: WalletGraphsProps) {
  // Mock data - replace with actual data fetching
  const balanceData = [
    { name: 'Jan', balance: 4000 },
    { name: 'Feb', balance: 3000 },
    { name: 'Mar', balance: 5000 },
    { name: 'Apr', balance: 4500 },
    { name: 'May', balance: 5000 },
  ]

  const expenseData = [
    { name: 'Groceries', value: 400 },
    { name: 'Rent', value: 1000 },
    { name: 'Utilities', value: 200 },
    { name: 'Entertainment', value: 300 },
    { name: 'Transport', value: 150 },
  ]

  const topSpendingData = [
    { category: 'Rent', amount: 1000 },
    { category: 'Groceries', amount: 400 },
    { category: 'Entertainment', amount: 300 },
    { category: 'Utilities', amount: 200 },
    { category: 'Transport', amount: 150 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Balance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={balanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="balance" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Spending Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSpendingData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

