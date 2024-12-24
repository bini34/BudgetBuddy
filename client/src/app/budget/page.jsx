import Header from "@/components/header";
import Layout from "@/components/layout";

export default function Page() {
    return (
        <Layout>
          <Header headerName="Budget" link="/budget" linkName="budget" />
        </Layout>
    );
}