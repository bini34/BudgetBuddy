import Layout from "@/components/layout"
import {DataTable} from "@/components/DataTable"
import {ExpenseAddForm} from "@/components/ExpenseAddForm"
export default function Page(){
    return <Layout>
        <div className="w-full flex flex-col gap-4">
            <header className="w-full flex flex-col justify-between gap-2 pl-8 py-4">
                <h1 className="text-4xl font-bold">Expense</h1>
                <p className="text-lg text-gray-500">Track your expenses and manage your budget.</p>
            </header>
            <main className="w-full flex  gap-4">
                    <DataTable />
                    <ExpenseAddForm />
            </main>
        </div>
    </Layout>
}