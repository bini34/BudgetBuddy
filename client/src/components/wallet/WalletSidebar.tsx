"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, CreditCard, PiggyBank, DollarSign, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react'
import { getUserWallets } from '@/lib/wallet'
interface Wallet {
  id: string
  bankName: string
  accountNumber: string
  balance: number
  currency: string
}

interface WalletSidebarProps {
  onSelectWallet: (walletId: string) => void
  onAddWallet: () => void
}

export function WalletSidebar({ onSelectWallet, onAddWallet }: WalletSidebarProps) {
  const [expandedWallet, setExpandedWallet] = useState<string | null>(null)
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        setIsLoading(true)
        const response = await getUserWallets()
        console.log("response from getUserWallets", response)
        setWallets(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch wallets')
        console.error('Error fetching wallets:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWallets()
  }, [])

  

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading wallets...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      {wallets.map((wallet) => (
        <Card key={wallet._id} className="cursor-pointer" onClick={() => onSelectWallet(wallet.id)}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
              <Wallet className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">{wallet.bankName}</h3>
                  <p className="text-sm text-muted-foreground">${wallet.balance.toFixed(2)} {wallet.currency}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button onClick={onAddWallet} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Wallet
      </Button>
    </div>
  )
}

