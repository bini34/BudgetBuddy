"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { getBudgetSubcategories } from '@/lib/budget'
import { createExpense } from '@/lib/expense'

interface SubCategory {
  id: string;
  name: string;
}

interface CategoryData {
  needs: SubCategory[];
  wants: SubCategory[];
  others: SubCategory[];
}

interface Expense {
  category: string
  subCategory: string
  amount: number
  month: number
  year: number
  notes: string
}

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void
}

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [category, setCategory] = useState<string>("")
  const [subCategory, setSubCategory] = useState<string>("")
  const [subCategoryId, setSubCategoryId] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch categories when component mounts
  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true)
      try {
        const response = await getBudgetSubcategories()
        if (response.success) {
          setCategoryData(response.data)
        } else {
          console.error('Failed to fetch categories:', response.error)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubCategoryChange = (value: string) => {
    const [id, name] = value.split('|')
    setSubCategory(name)
    setSubCategoryId(id)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (category && subCategory && amount) {
      const currentDate = new Date()
      const newExpense: Expense = {
        category,
        subCategory,
        amount: parseFloat(amount),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        notes,
      }
      console.log("newExpense", newExpense);
      const response = await createExpense(newExpense)
      console.log("response", response);
      if (response.success) {
        onAddExpense(newExpense)
        // Reset form
        setCategory("")
        setSubCategory("")
        setSubCategoryId("")
        setAmount("")
        setNotes("")
      }
    }
  }

  const currentSubCategories = categoryData?.[category as keyof CategoryData] || []
  const currentDate = new Date()
  const currentMonthYear = format(currentDate, "MMMM yyyy")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="needs">Needs</SelectItem>
                <SelectItem value="wants">Wants</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subCategory">Sub-category</Label>
            <Select 
              value={subCategoryId ? `${subCategoryId}|${subCategory}` : ''}
              onValueChange={handleSubCategoryChange}
              disabled={!category || isLoading}
            >
              <SelectTrigger id="subCategory">
                <SelectValue placeholder={isLoading ? "Loading..." : "Select sub-category"} />
              </SelectTrigger>
              <SelectContent>
                {currentSubCategories.map((subCat) => (
                  <SelectItem 
                    key={subCat.id} 
                    value={`${subCat.id}|${subCat.name}`}
                  >
                    {subCat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <div className="p-2 border rounded-md text-sm text-muted-foreground">
              {currentMonthYear}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes"
            />
          </div>
          
          <Button type="submit" className="w-full">Add Expense</Button>
        </form>
      </CardContent>
    </Card>
  )
}

