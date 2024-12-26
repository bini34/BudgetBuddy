import Layout from "@/components/layout"
import Header from "@/components/header"

export default function Page(){
    return <Layout>
        <div className="w-full flex flex-col gap-4">
            <Header headerName="Expense" link="/expense" linkName="Expense" />

            <main className="w-full flex  gap-4">
                <div>
                    
                </div>
                {/* <DataTable />
                <ExpenseAddForm /> */}
            </main>
        </div>
    </Layout>
}