import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  
export default function Header({headerName, link, linkName}){
    return(
        <header className="w-full flex  justify-between gap-2  pb-5">
        <div className="flex flex-col ">
            <h1 className="text-2xl font-bold">{headerName}</h1>
            <p className=" text-gray-500">Track your income and manage your budget.</p>
        </div>
    <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink href={link}>{linkName}</BreadcrumbLink>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
    </header>
    );
}