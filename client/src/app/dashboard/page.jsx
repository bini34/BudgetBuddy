"use client"
import { useState, useEffect } from "react";
import { CardDashboard } from "@/components/carddashboard";
import {  DollarSign, CreditCard, PiggyBank, PieChart } from 'lucide-react';
import { AreaChartComponent } from "@/components/areachart";
import { PieChartComponent } from "@/components/piechartcard";
import Layout from "@/components/layout";
import BarChart  from "@/components/barChart";
import MonthlyBreakdown from "@/components/monthlyBreakdown";
import Header from "@/components/header";
import { getDashboardCards } from "@/lib/report";
export default function Page() {
  const [cardDashboard, setCardDashboard] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => { 
      const response = await getDashboardCards();
      console.log("response dashboard", response);
      setCardDashboard(response.data);
    };
    fetchData();
  }, []);
  return (
       <Layout>
          <Header headerName="Dashboard" link="/dashboard" linkName="dashboard" />
          <div className="flex w-full gap-4 overflow-x-auto">
            {cardDashboard.map((card, index) => (
              <CardDashboard key={index} icon={card.icon} title={card.title} value={card.value} />
            ))}
          </div>
          <div className="flex gap-4">
            <AreaChartComponent />

            <MonthlyBreakdown />
          </div>
          <div className="flex md:flex-row flex-col w-full gap-4 overflow-x-auto">
          <BarChart />

            <PieChartComponent />
          </div>
      </Layout>
       
  );
}
