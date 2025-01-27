"use client"

import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { getBudgetSubcategories } from '@/lib/budget'
import { getExpensesByFilters } from '@/lib/expense'

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
  id: string
  category: string
  subCategory: string
  amount: number
  month: number
  year: number
  createdAt: string
  notes: string
}

export function ExpenseTable() {
  const [category, setCategory] = useState<string>("all")
  const [subCategory, setSubCategory] = useState<string>("")
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingExpenes, setIsLoadingExpenses] = useState(false)

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

  // Fetch expenses when filters change
  useEffect(() => {
    async function fetchExpenses() {
      setIsLoadingExpenses(true)
      console.log("subCategory", subCategory)
      try {
        const response = await getExpensesByFilters({
          category: category === 'all' ? undefined : category,
          subCategory: subCategory || undefined
        });
        
        if (response.success) {
          setExpenses(response.data);
        } else {
          console.error('Failed to fetch expenses:', response.error);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setIsLoadingExpenses(false);
      }
    }

    fetchExpenses();
  }, [category, subCategory]);

  const handleSubCategoryChange = (value: string) => {
    if (value === "all") {
      setSubCategory("")
      return
    }
    
    const [_, name] = value.split('|')
    setSubCategory(name)
  }

  const currentSubCategories = categoryData?.[category as keyof CategoryData] || []

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  const totalExpenses = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={category} 
            onValueChange={(value) => {
              setCategory(value)
              setSubCategory("")
            }}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
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
          <Label htmlFor="subCategory">Sub-category</Label>
          <Select 
            value={subCategory ? `${subCategory}` : 'all'}
            onValueChange={handleSubCategoryChange}
            disabled={category === "all" || isLoading}
          >
            <SelectTrigger id="subCategory">
              <SelectValue placeholder={isLoading ? "Loading..." : "Select sub-category"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sub-categories</SelectItem>
              {currentSubCategories.map((subCat: SubCategory, index:number) => (
                <SelectItem 
                  key={index} 
                  value={`${subCat.name}`}
                >
                  {subCat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoadingExpenes ? (
        <div className="text-center py-4">Loading expenses...</div>
      ) : (
        <>
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
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell className="capitalize">{expense.category}</TableCell>
                  <TableCell>{expense.subCategory}</TableCell>
                  <TableCell>${expense.amount}</TableCell>
                  <TableCell>
                    {/* {format(new Date(expense.year, expense.month - 1), "MMMM yyyy")} */}
                  </TableCell>
                  <TableCell>{expense.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">Category Totals:</h3>
            {Object.entries(categoryTotals).map(([category, total]) => (
              <p key={category} className="capitalize">{category}: ${total.toFixed(2)}</p>
            ))}
            <p className="font-bold">Total Expenses: ${totalExpenses.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  )
}

