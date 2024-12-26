import Layout from "@/components/layout"
import {DataTable} from "@/components/DataTable"
import {IncomeAddForm} from "@/components/IncomeAddForm"
import IncomeCard from "@/components/incomeCard"
import Header from "@/components/header"
export default function Page(){
    return <Layout>
        <div className="w-full flex flex-col gap-4">
           <Header headerName="Income" link="/income" linkName="Income" />
            <main className="w-full flex  gap-4">
                <div className="w-300px h-auto flex flex-col gap-2">
                  <IncomeCard/>
                  <IncomeCard/>
                  <IncomeCard/>

                </div>
                <div className="w-full">
                    <header>
                        <h1>Income</h1>
                    </header>
                </div>
            </main>
        </div>
    </Layout>
}