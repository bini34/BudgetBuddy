"use client"

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"

interface Expense {
  id: string
  category: string
  subCategory: string
  amount: number
  date: Date
  notes: string
}

interface ExpenseTableProps {
  expenses: Expense[]
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterSubCategory, setFilterSubCategory] = useState("")

  const filteredExpenses = expenses.filter(expense => 
    (filterCategory === "all" || expense.category === filterCategory) &&
    (filterSubCategory === "" || expense.subCategory.toLowerCase().includes(filterSubCategory.toLowerCase()))
  )

  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="filterCategory">Filter by Category</Label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger id="filterCategory">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="needs">Needs</SelectItem>
              <SelectItem value="wants">Wants</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="filterSubCategory">Filter by Sub-category</Label>
          <Input
            id="filterSubCategory"
            value={filterSubCategory}
            onChange={(e) => setFilterSubCategory(e.target.value)}
            placeholder="Enter sub-category"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Sub-category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{expense.subCategory}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
              <TableCell>{format(expense.date, "PPP")}</TableCell>
              <TableCell>{expense.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold">Category Totals:</h3>
        {Object.entries(categoryTotals).map(([category, total]) => (
          <p key={category}>{category}: ${total.toFixed(2)}</p>
        ))}
        <p className="font-bold">Total Expenses: ${totalExpenses.toFixed(2)}</p>
      </div>
    </div>
  )
}

