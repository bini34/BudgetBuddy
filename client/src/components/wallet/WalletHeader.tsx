import { Button } from "@/components/ui/button"
import { PlusCircle, ArrowRightLeft } from 'lucide-react'

interface WalletHeaderProps {
  onAddWallet: () => void
  onTransferFunds: () => void
}

export function WalletHeader({ onAddWallet, onTransferFunds }: WalletHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Wallet Management</h1>
      <div className="space-x-2">
        <Button onClick={onAddWallet} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Wallet
        </Button>
        <Button onClick={onTransferFunds} variant="outline">
          <ArrowRightLeft className="mr-2 h-4 w-4" /> Transfer Funds
        </Button>
      </div>
    </div>
  )
}

