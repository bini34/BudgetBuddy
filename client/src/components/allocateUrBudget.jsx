"use client"
import { Slider } from "@/components/ui/slider";
import {PieChartComponent} from "@/components/piechartcard"
import { useState } from "react";
import { Card } from "./ui/card";

export function AllocateUrBudget() {
    const [wantsValue, setWantsValue] = useState([50]);
    const [needValue, setNeedValue] = useState([50]);
    const [savingsValue, setSavingsValue] = useState([50]);
    return ( <div className="w-full flex flex-col gap-8">
    <header><h1 className="text-4xl font-bold py-4">Allocate Your Budget</h1></header>
    <main className="w-full flex gap-4">
        <Card className="w-full h-max align-middle flex flex-col gap-4 p-4">
            <div className="flex gap-2">
                <p>Need</p>
                <Slider value={needValue} onValueChange={setNeedValue} />
                <p>{needValue}</p>
            </div>
            <div className="flex gap-2">
                <p>Wants</p>
                <Slider value={wantsValue} onValueChange={setWantsValue} />
                <p>{wantsValue}</p>
            </div>
            <div className="flex  gap-2">
                <p>Savings</p>
                <Slider value={savingsValue} onValueChange={setSavingsValue} />
                <p>{savingsValue}</p>
            </div>
        </Card>
        <PieChartComponent/>
    </main>
</div>
);
}