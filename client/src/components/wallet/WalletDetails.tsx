"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, PiggyBank } from 'lucide-react'

interface WalletDetailsProps {
  selectedWallet: string | null
}

export function WalletDetails({ selectedWallet }: WalletDetailsProps) {
  const [wallet, setWallet] = useState<any>(null)

  useEffect(() => {
    // Mock data - replace with actual API call
    if (selectedWallet) {
      setWallet({
        id: selectedWallet,
        name: 'City Bank',
        type: 'Bank',
        balance: 5000,
        personalFunds: 4000,
        creditLimit: 1000,
        accountNumber: '**** **** **** 1234',
        holderName: 'John Doe',
        expiry: '12/25',
        monthlyExpenses: 1500,
        monthlySavings: 700,
        savingsGoal: 1000,
      })
    }
  }, [selectedWallet])

  if (!wallet) {
    return <div>Select a wallet to view details</div>
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{wallet.name} ({wallet.type})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-4">${wallet.balance.toFixed(2)}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Personal Funds</p>
              <p className="font-semibold">${wallet.personalFunds.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Credit Limit</p>
              <p className="font-semibold">${wallet.creditLimit.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${wallet.balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${wallet.monthlyExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${wallet.monthlySavings.toFixed(2)}</div>
            <Progress value={(wallet.monthlySavings / wallet.savingsGoal) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {((wallet.monthlySavings / wallet.savingsGoal) * 100).toFixed(0)}% of ${wallet.savingsGoal} goal reached
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transfers" className="w-full">
        <TabsList>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="transfers">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add transfer history table here */}
              <p>Transfer history will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add transaction history table here */}
              <p>Transaction history will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

