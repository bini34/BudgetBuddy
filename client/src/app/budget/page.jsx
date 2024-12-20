import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";

import {AllocateUrBudget} from "@/components/allocateUrBudget"
export default function Page() {
    return (
        <Layout>
            <div className="w-full flex flex-col gap-4">
                <header className="w-full flex flex-col justify-between gap-2 pl-8 py-4">
                    <h1 className="text-4xl font-bold">Budget Setup</h1>
                    <p className="text-lg text-gray-500">Define your income, allocate percentages, and customize your budget for the month.</p>
                </header>
                <main className="w-full flex flex-col ">
                    <div className="w-full flex justify-end ">
                        <div className="md:w-1/2 w-full sm:flex-row flex flex-col gap-4  ">
                            <Input type="text" placeholder="Income Source" />
                            <Input type="number" placeholder="Enter amount" />
                            <Button className="w-full">Add</Button>
                        </div>
                    </div>
                    <DataTable />
                </main>

            </div>
            <AllocateUrBudget />
        </Layout>
    );
}