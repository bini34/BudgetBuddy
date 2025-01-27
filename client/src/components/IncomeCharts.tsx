"use client"

import { IncomePieChart } from "./IncomePieChart"

interface IncomeEntry {
  id: string
  source: string
  amount: number
  date: string
}

interface IncomeChartsProps {
  incomeData: IncomeEntry[]
}

export function IncomeCharts({ incomeData }: IncomeChartsProps) {
  return (
      <IncomePieChart incomeData={incomeData} />
  )
}

