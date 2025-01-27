"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoanTable } from "@/components/LoanTable"
import { PaymentSchedule } from "@/components/PaymentSchedule"
import Layout from '@/components/layout'
import { createLoan, getUserLoans, updateLoan } from '@/lib/loans'
interface Loan {
  id: string
  lender: string
  amount: number
  interestRate: number
  payoffDate: string
}

interface Payment {
  id: string
  loanId: string
  lender: string
  amount: number
  payoffDate: string
}

export default function LoanTrackingPage() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    const fetchLoans = async () => {
      const loans = await getUserLoans();
      console.log("loans",loans)
      setLoans(loans);
      
      // Generate payments based on loans
      const generatedPayments = loans.map((loan: Loan) => ({
        id: `payment-${loan.id}`,
        loanId: loan.id,
        lender: loan.lender,
        amount: loan.amount,
        payoffDate: loan.payoffDate,
      }));
      setPayments(generatedPayments);
    };
    
    fetchLoans();
  }, []);

  const handleAddLoan = async (newLoan: Omit<Loan, 'id'>) => {
    const response = await createLoan(newLoan);
    const addedLoan = await response.json()
    setLoans([...loans, addedLoan])
    // Add corresponding payment
    // setPayments([...payments, {
    //   id: `payment-${addedLoan.id}`,
    //   loanId: addedLoan.id,
    //   lender: addedLoan.lender,
    //   amount: addedLoan.amount,
    //   dueDate: addedLoan.dueDate,
    //   status: 'Unpaid'
    // }])
  }

  const handleUpdateLoanStatus = async (id: string, status: 'Paid' | 'Unpaid') => {
    const response = await updateLoan(id, status);
    const updatedLoan = await response.json()
    
    setLoans(loans.map((loan: typeof updatedLoan) => 
      loan.id === updatedLoan.id ? updatedLoan : loan
    ))
    // Update the corresponding payment status
    setPayments(payments.map(payment => 
      payment.loanId === id ? { ...payment, status } : payment
    ))
  }

  const handleMarkPaymentAsPaid = (id: string) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: 'Paid' } : payment
    ))
    // Update the corresponding loan status
    const paidPayment = payments.find(payment => payment.id === id)
    if (paidPayment) {
      handleUpdateLoanStatus(paidPayment.loanId, 'Paid')
    }
  }

  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0)

  return (
    <Layout>
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Loan Tracking</h1>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Loan Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalLoanAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-1">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Loan Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <LoanTable
                loans={loans}
                onAddLoan={handleAddLoan}
                onUpdateLoanStatus={handleUpdateLoanStatus}
              />
            </CardContent>
          </Card>
        </div>
        <PaymentSchedule
          payments={payments}
          onMarkAsPaid={handleMarkPaymentAsPaid}
        />
      </div>
    </div>
    </Layout>
  )
}

