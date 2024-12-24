import Layout from "@/components/layout"
import {DataTable} from "@/components/DataTable"
import {IncomeAddForm} from "@/components/IncomeAddForm"
import Header from "@/components/header"
export default function Page(){
    return <Layout>
        <div className="w-full flex flex-col gap-4">
           <Header headerName="Income" link="/income" linkName="Income" />
            <main className="w-full flex  gap-4">
                    {/* <DataTable />
                    <IncomeAddForm /> */}
            </main>
        </div>
    </Layout>
}