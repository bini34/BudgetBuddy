"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Trash2 } from 'lucide-react'
import { createBudget, getUserBudgets, addIncomeSource } from '../lib/budget';
interface IncomeSource {
  id: string
  label: string
  amount: number
}

interface ExpenseCategory {
  id: string
  name: string
  type: 'needs' | 'wants' | 'others'
  amount: number
}

interface SavingsAllocation {
  id: string
  label: string
  percentage: number
}

interface BudgetData {
  incomeSources: { name: string; amount: number }[];
  expensePlanCategories: {
    needs: { name: string; amount: number }[];
    wants: { name: string; amount: number }[];
    others: { name: string; amount: number }[];
  };
  savingsPlan: { name: string; percentage: number; amount: number }[];
  month: {
    year: number;
    month: number;
  };
}

export function BudgetSetupForm() {
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([
    { id: '1', label: 'Salary', amount: 0 },
  ])
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([
    { id: '1', name: 'Rent', type: 'needs', amount: 0 },
    { id: '2', name: 'Electricity', type: 'needs', amount: 0 },
    { id: '3', name: 'Internet', type: 'needs', amount: 0 },
    { id: '4', name: 'Transport', type: 'needs', amount: 0 },
    { id: '5', name: 'Grocery', type: 'needs', amount: 0 },
    { id: '6', name: 'Books', type: 'wants', amount: 0 },
    { id: '7', name: 'Fun money', type: 'wants', amount: 0 }
  ])
  const [savingsAllocations, setSavingsAllocations] = useState<SavingsAllocation[]>([
    { id: '1', label: 'needs', percentage: 50 },
    { id: '2', label: 'wants', percentage: 30 },
    { id: '3', label: 'savings', percentage: 20 },
  ])
  const { toast } = useToast()

  const totalIncome = incomeSources.reduce((sum, source) => sum + source.amount, 0)
  const totalExpenses = expenseCategories.reduce((sum, category) => sum + category.amount, 0)
  const totalSavings = totalIncome - totalExpenses

  const handleAddIncomeSource = () => {
    setIncomeSources([...incomeSources, { id: Date.now().toString(), label: '', amount: 0 }])
  }

  const handleUpdateIncomeSource = (id: string, field: 'label' | 'amount', value: string) => {
    setIncomeSources(incomeSources.map(source => 
      source.id === id ? { ...source, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : source
    ))
  }

  const handleRemoveIncomeSource = (id: string) => {
    setIncomeSources(incomeSources.filter(source => source.id !== id))
  }

  const handleUpdateExpenseCategory = (id: string, field: 'name' | 'amount', value: string) => {
    setExpenseCategories(expenseCategories.map(category => 
      category.id === id ? { ...category, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : category
    ))
  }

  const handleAddExpenseCategory = (type: 'needs' | 'wants' | 'others') => {
    setExpenseCategories([...expenseCategories, { id: Date.now().toString(), name: '', type, amount: 0 }])
  }

  const handleRemoveExpenseCategory = (id: string) => {
    setExpenseCategories(expenseCategories.filter(category => category.id !== id))
  }

  const handleUpdateSavingsAllocation = (id: string, field: 'label' | 'percentage', value: string) => {
    setSavingsAllocations(savingsAllocations.map(allocation => 
      allocation.id === id ? { ...allocation, [field]: field === 'percentage' ? parseFloat(value) || 0 : value } : allocation
    ))
  }

  const prepareBudgetData = (): BudgetData => {
    // Calculate savings amounts based on percentages
    const savingsPlanWithAmounts = savingsAllocations.map(allocation => ({
      name: allocation.label,
      percentage: allocation.percentage,
      amount: (totalSavings * allocation.percentage) / 100
    }));

    return {
      incomeSources: incomeSources.map(source => ({
        name: source.label,
        amount: source.amount
      })),
      expensePlanCategories: {
        needs: expenseCategories
          .filter(cat => cat.type === 'needs')
          .map(cat => ({ name: cat.name, amount: cat.amount })),
        wants: expenseCategories
          .filter(cat => cat.type === 'wants')
          .map(cat => ({ name: cat.name, amount: cat.amount })),
        others: expenseCategories
          .filter(cat => cat.type === 'others')
          .map(cat => ({ name: cat.name, amount: cat.amount }))
      },
      savingsPlan: savingsPlanWithAmounts,
      month: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const budgetData = prepareBudgetData();
      console.log("budgetData", budgetData)
      const response = await createBudget(budgetData);
      if (!response.ok) {
        throw new Error('Failed to save budget');
      }

      toast({
        title: "Budget saved",
        description: "Your budget has been successfully updated.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save budget. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <Card>
        <CardHeader>
          <CardTitle>Income Sources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {incomeSources.map((source, index) => (
            <div key={source.id} className="flex items-center space-x-2">
              <Input
                value={source.label}
                onChange={(e) => handleUpdateIncomeSource(source.id, 'label', e.target.value)}
                placeholder="Income source"
                className="flex-grow"
              />
              <Input
                type="number"
                value={source.amount}
                onChange={(e) => handleUpdateIncomeSource(source.id, 'amount', e.target.value)}
                placeholder="Amount"
                className="w-32"
              />
              {index > 0 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveIncomeSource(source.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddIncomeSource}>
            <Plus className="mr-2 h-4 w-4" /> Add Income Source
          </Button>
          <div className="font-semibold">Total Income: ${totalIncome.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {['needs', 'wants', 'others'].map((type) => (
            <div key={type} className="space-y-4">
              <h3 className="font-semibold capitalize">{type}</h3>
              {expenseCategories
                .filter((category) => category.type === type)
                .map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Input
                      value={category.name}
                      onChange={(e) => handleUpdateExpenseCategory(category.id, 'name', e.target.value)}
                      placeholder="Category name"
                      className="flex-grow"
                    />
                    <Input
                      type="number"
                      value={category.amount}
                      onChange={(e) => handleUpdateExpenseCategory(category.id, 'amount', e.target.value)}
                      placeholder="Amount"
                      className="w-32"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveExpenseCategory(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              <Button type="button" variant="outline" onClick={() => handleAddExpenseCategory(type as 'needs' | 'wants' | 'others')}>
                <Plus className="mr-2 h-4 w-4" /> Add {type} Category
              </Button>
            </div>
          ))}
          <div className="font-semibold">Total Expenses: ${totalExpenses.toFixed(2)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Savings Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {savingsAllocations.map((allocation) => (
            <div key={allocation.id} className="flex items-center space-x-2">
              <Input
                value={allocation.label}
                onChange={(e) => handleUpdateSavingsAllocation(allocation.id, 'label', e.target.value)}
                placeholder="Savings allocation"
                className="flex-grow"
              />
              <Input
                type="number"
                value={allocation.percentage}
                onChange={(e) => handleUpdateSavingsAllocation(allocation.id, 'percentage', e.target.value)}
                placeholder="Percentage"
                className="w-32"
              />
              <span>%</span>
            </div>
          ))}
          <div className="font-semibold">Total Savings: ${totalSavings.toFixed(2)}</div>
          <div>
            {savingsAllocations.map((allocation) => (
              <div key={allocation.id}>
                {allocation.label}: ${(totalSavings * allocation.percentage / 100).toFixed(2)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">Save Budget</Button>
    </motion.form>
  )
}

