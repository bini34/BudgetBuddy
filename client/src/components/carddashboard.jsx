import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function CardDashboard({ icon, title, value }) {
  return (
    <Card className="w-full min-w-[100px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {icon}
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{value}</p>
    </CardContent>
    </Card>);
}
