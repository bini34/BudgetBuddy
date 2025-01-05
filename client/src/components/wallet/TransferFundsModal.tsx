"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface TransferFundsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TransferFundsModal({ isOpen, onClose }: TransferFundsModalProps) {
  const [fromWallet, setFromWallet] = useState('')
  const [toWallet, setToWallet] = useState('')
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ fromWallet, toWallet, amount, notes })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Funds</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fromWallet">From Wallet</Label>
              <Select value={fromWallet} onValueChange={setFromWallet}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wallet1">City Bank</SelectItem>
                  <SelectItem value="wallet2">Visa Card</SelectItem>
                  <SelectItem value="wallet3">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="toWallet">To Wallet</Label>
              <Select value={toWallet} onValueChange={setToWallet}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination wallet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wallet1">City Bank</SelectItem>
                  <SelectItem value="wallet2">Visa Card</SelectItem>
                  <SelectItem value="wallet3">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter transfer amount"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any additional notes"
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="submit">Transfer Funds</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

