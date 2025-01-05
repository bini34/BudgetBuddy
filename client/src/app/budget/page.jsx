import Header from "@/components/header";
import Layout from "@/components/layout";
import { BudgetSetupForm } from "../../components/BudgetSetupForm";
export default function Page() {
    return (
        <Layout>
          <Header headerName="Budget" link="/budget" linkName="budget" />
          <BudgetSetupForm />
        </Layout>
    );
}