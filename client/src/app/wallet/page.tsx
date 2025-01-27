"use client"

import { useState } from 'react'
import { WalletHeader } from "@/components/wallet/WalletHeader"
import { WalletSidebar } from "@/components/wallet/WalletSidebar"
import { WalletDetails } from "@/components/wallet/WalletDetails"
import { WalletGraphs } from "@/components/wallet/WalletGraphs"
import { AddWalletModal } from "@/components/wallet/AddWalletModal"
import { TransferFundsModal } from "@/components/wallet/TransferFundsModal"
import Layout from '@/components/layout'
export default function WalletPage() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [isAddWalletModalOpen, setIsAddWalletModalOpen] = useState(false)

  const handleAddWallet = () => {
    setIsAddWalletModalOpen(true)
  }



  return (
    <Layout>
    <div className="container mx-auto p-4">
      <WalletHeader  />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <div className="w-full md:w-1/3">
          <WalletSidebar onSelectWallet={setSelectedWallet} onAddWallet={handleAddWallet} />
        </div>
        <div className="w-full md:w-2/3">
          <WalletDetails selectedWallet={selectedWallet} />
        </div>
      </div>
      <AddWalletModal isOpen={isAddWalletModalOpen} onClose={() => setIsAddWalletModalOpen(false)} />
    </div>
    </Layout>
  )
}

