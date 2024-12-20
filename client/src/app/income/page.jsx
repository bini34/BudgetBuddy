import Layout from "@/components/layout"
import {DataTable} from "@/components/DataTable"
import {IncomeAddForm} from "@/components/IncomeAddForm"
export default function Page(){
    return <Layout>
        <div className="w-full flex flex-col gap-4">
            <header className="w-full flex flex-col justify-between gap-2 pl-8 py-4">
                <h1 className="text-4xl font-bold">Income</h1>
                <p className="text-lg text-gray-500">Track your income and manage your budget.</p>
            </header>
            <main className="w-full flex  gap-4">
                    <DataTable />
                    <IncomeAddForm />
            </main>
        </div>
    </Layout>
}