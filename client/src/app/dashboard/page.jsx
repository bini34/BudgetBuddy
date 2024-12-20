import { CardDashboard } from "@/components/carddashboard";
import {  DollarSign, CreditCard, PiggyBank, PieChart } from 'lucide-react';
import { AreaChartComponent } from "@/components/areachart";
import { PieChartComponent } from "@/components/piechartcard";
import Layout from "@/components/layout";
export default function Page() {
const cardDashboard = 
  [
    {
      icon: <DollarSign />,
      title: "Income",
      value: "$45,231.89"
    },
    {
      icon: <CreditCard />,
      title: "Expenses",
      value: "$45,231.89"
    },
    {
      icon: <PiggyBank />,
      title: "Savings",
      value: "$45,231.89"
    },
    {
      icon: <PieChart />,
      title: "Remaining Budget",
      value: "$45,231.89"
    }
  ]

  return (
       <Layout>
          <div className="flex w-full gap-4 overflow-x-auto">
            {cardDashboard.map((card, index) => (
              <CardDashboard key={index} icon={card.icon} title={card.title} value={card.value} />
            ))}
          </div>
          <AreaChartComponent />
          <div className="flex md:flex-row flex-col w-full gap-4 overflow-x-auto">
            <PieChartComponent />
          </div>
      </Layout>
       
  );
}
