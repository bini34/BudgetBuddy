import { Card, CardContent } from "@/components/ui/card"

export default function BudgetCard({ 
    title, 
    amount, 
    icon: Icon, 
    color = "white" 
}) {
    const colorVariants = {
        white: "bg-white text-gray-900",
        blue: "bg-blue-600 text-white",
        green: "bg-green-600 text-white",
        red: "bg-red-600 text-white",
        // Add more color variants as needed
    }

    return (
        <Card className={`${colorVariants[color]}`}>
            <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className={`${color === 'white' ? 'bg-gray-100' : `bg-${color}-700`} p-2 rounded-full`}>
                        <Icon size={24} className={color === 'white' ? 'text-gray-600' : 'text-white'} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm">{title}</span>
                        <span className="text-xl font-semibold">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            }).format(amount)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}