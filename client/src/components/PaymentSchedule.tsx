"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Payment {
  id: string
  loanId: string
  lender: string
  amount: number
  dueDate: string
  status: 'Paid' | 'Unpaid'
}

interface PaymentScheduleProps {
  payments: Payment[]
  onMarkAsPaid: (id: string) => void
}

export function PaymentSchedule({ payments, onMarkAsPaid }: PaymentScheduleProps) {
  const today = new Date()
  const sortedPayments = [...payments].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {sortedPayments.map((payment) => {
            const dueDate = new Date(payment.dueDate)
            const isOverdue = dueDate < today && payment.status === 'Unpaid'
            const isUpcoming = dueDate > today && dueDate <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) // Within next 7 days

            return (
              <li
                key={payment.id}
                className={`flex justify-between items-center p-2 rounded ${
                  isOverdue ? 'bg-red-100' : isUpcoming ? 'bg-yellow-100' : ''
                }`}
              >
                <div>
                  <p className="font-medium">{payment.lender}</p>
                  <p className="text-sm text-muted-foreground">Due: {payment.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${payment.amount.toFixed(2)}</p>
                  {payment.status === 'Unpaid' && (
                    <Button size="sm" onClick={() => onMarkAsPaid(payment.id)}>Mark as Paid</Button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

