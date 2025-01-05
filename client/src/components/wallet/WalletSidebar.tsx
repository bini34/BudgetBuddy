"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, CreditCard, PiggyBank, DollarSign, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react'

interface Wallet {
  id: string
  name: string
  type: 'bank' | 'debit' | 'credit' | 'cash'
  balance: number
}

interface WalletSidebarProps {
  onSelectWallet: (walletId: string) => void
  onAddWallet: () => void
}

export function WalletSidebar({ onSelectWallet, onAddWallet }: WalletSidebarProps) {
  const [expandedWallet, setExpandedWallet] = useState<string | null>(null)

  // Mock data - replace with actual data fetching
  const wallets: Wallet[] = [
    { id: '1', name: 'City Bank', type: 'bank', balance: 5000 },
    { id: '2', name: 'Visa Card', type: 'credit', balance: 2000 },
    { id: '3', name: 'Cash', type: 'cash', balance: 500 },
  ]

  const getWalletIcon = (type: Wallet['type']) => {
    switch (type) {
      case 'bank':
        return <Wallet className="h-6 w-6" />
      case 'debit':
      case 'credit':
        return <CreditCard className="h-6 w-6" />
      case 'cash':
        return <DollarSign className="h-6 w-6" />
      default:
        return <PiggyBank className="h-6 w-6" />
    }
  }

  return (
    <div className="space-y-4">
      {wallets.map((wallet) => (
        <Card key={wallet.id} className="cursor-pointer" onClick={() => onSelectWallet(wallet.id)}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getWalletIcon(wallet.type)}
                <div>
                  <h3 className="font-semibold">{wallet.name}</h3>
                  <p className="text-sm text-muted-foreground">${wallet.balance.toFixed(2)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setExpandedWallet(expandedWallet === wallet.id ? null : wallet.id)
                }}
              >
                {expandedWallet === wallet.id ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            {expandedWallet === wallet.id && (
              <div className="mt-4 space-y-2">
                <p className="text-sm">Last 5 transactions:</p>
                {/* Mock transactions - replace with actual data */}
                <ul className="text-sm">
                  <li>2023-05-01: -$50.00 (Groceries)</li>
                  <li>2023-04-28: +$1000.00 (Salary)</li>
                  <li>2023-04-25: -$30.00 (Dining)</li>
                  <li>2023-04-22: -$100.00 (Utilities)</li>
                  <li>2023-04-20: -$20.00 (Transportation)</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <Button onClick={onAddWallet} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Wallet
      </Button>
    </div>
  )
}

