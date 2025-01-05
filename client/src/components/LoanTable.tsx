"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface Loan {
  id: string
  lender: string
  amount: number
  interestRate: number
  dueDate: string
  status: 'Paid' | 'Unpaid'
}

interface LoanTableProps {
  loans: Loan[]
  onAddLoan: (loan: Loan) => void
  onUpdateLoanStatus: (id: string, status: 'Paid' | 'Unpaid') => void
}

export function LoanTable({ loans, onAddLoan, onUpdateLoanStatus }: LoanTableProps) {
  const [newLoan, setNewLoan] = useState<Partial<Loan>>({})
  const { toast } = useToast()

  const handleAddLoan = (e: React.FormEvent) => {
    e.preventDefault()
    if (newLoan.lender && newLoan.amount && newLoan.interestRate && newLoan.dueDate) {
      const loan: Loan = {
        id: Date.now().toString(),
        lender: newLoan.lender,
        amount: Number(newLoan.amount),
        interestRate: Number(newLoan.interestRate),
        dueDate: newLoan.dueDate,
        status: 'Unpaid'
      }
      onAddLoan(loan)
      setNewLoan({})
      toast({
        title: "Loan Added",
        description: `New loan from ${loan.lender} has been added.`,
      })
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddLoan} className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="lender">Lender</Label>
          <Input
            id="lender"
            value={newLoan.lender || ''}
            onChange={(e) => setNewLoan({ ...newLoan, lender: e.target.value })}
            placeholder="Lender name"
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={newLoan.amount || ''}
            onChange={(e) => setNewLoan({ ...newLoan, amount: e.target.value })}
            placeholder="Loan amount"
            required
          />
        </div>
        <div>
          <Label htmlFor="interestRate">Interest Rate (%)</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.01"
            value={newLoan.interestRate || ''}
            onChange={(e) => setNewLoan({ ...newLoan, interestRate: e.target.value })}
            placeholder="Interest rate"
            required
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={newLoan.dueDate || ''}
            onChange={(e) => setNewLoan({ ...newLoan, dueDate: e.target.value })}
            required
          />
        </div>
        <div className="flex items-end">
          <Button type="submit" className="w-full">Add Loan</Button>
        </div>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lender</TableHead>
            <TableHead>Loan Amount</TableHead>
            <TableHead>Interest Rate</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>{loan.lender}</TableCell>
              <TableCell>${loan.amount.toFixed(2)}</TableCell>
              <TableCell>{loan.interestRate}%</TableCell>
              <TableCell>{loan.dueDate}</TableCell>
              <TableCell>{loan.status}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateLoanStatus(loan.id, loan.status === 'Paid' ? 'Unpaid' : 'Paid')}
                >
                  Mark as {loan.status === 'Paid' ? 'Unpaid' : 'Paid'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

